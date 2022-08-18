# Production Server Setup

NOTE: This documentation needs to be revised to make it more user-friendly. (Pull requests are accepted - if you run through these steps and find an issue or something that can be stated more clearly, please consider submitting one!)

## Server Creation

1. Create a new Linux server. (These instructions were written using a Digital Ocean droplet, using the NodeJS image from their marketplace.)
1. SSH into the server.
1. Fully update the server:
```
sudo apt-get update
sudo apt-get dist-upgrade
```
1. Add a non-root sudo user for yourself to do administration:
```
adduser jonsnow
susermod -aG sudo jonsnow
```
1. To help protect the server, install fail2ban by running these commands on the server
```
sudo apt-get update
sudo apt-get install fail2ban
awk '{ printf "# "; print; }' /etc/fail2ban/jail.conf | sudo tee /etc/fail2ban/jail.local

sudo nano /etc/fail2ban/jail.local
```

 Scroll down to the [DEFAULT] section and change bantime to 60m
 Scroll down to the [nginx-http-auth] section and uncomment that line
 Add enabled=true underneath it

 Then, run:
 ```
sudo service fail2ban restart
 ```

## Install NodeJS
1. If NodeJS is not installed on the server, install it.

Update NodeJS and install npm:

```
sudo npm install -g npm@latest

sudo apt install build-essential checkinstall libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash

Then, close and reopen terminal

nvm ls-remote
Install Node 16 with:
nvm install v16.16.0
```

## Install Mongo
Install Mongo using the instructions at https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

After installing Mongo, we'll set up a Mongo user. Launch Mongo shell with:
```
mongo
```

Then, in Mongo shell:
```
use comrad
  db.createUser(
    {
      user: "comradDB",
      pwd: "(provide a password for the application)",
      roles: [ { role: "readWrite", db: "comrad" },{ role: "backup", db: "comrad" } ]
    }
  )
  db.createUser(
    {
      user: "root",
      pwd: "(provide a root password for Mongo)",
      roles: [ "root", { role: "dbAdmin", db:"comrad"} ]
    }
  )
exit
```

Then, open the mongo configuration:
```
sudo nano /etc/mongod.conf
```

Scroll down to "#security" and uncomment the line
Below it, put:
```
    authorization: "enabled"
```

Close the file and restart mongo:

```
sudo systemctl restart mongod
```

## Install nginx
```
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx Full'
```

## Download and set up the source code for Comrad
```
cd /srv
sudo mkdir comrad

sudo groupadd comrad
sudo chown jonsnow:comrad comrad
sudo chmod 770 comrad
sudo chmod g+s comrad
sudo usermod -a -G comrad jonsnow
```

Disconnect and reconnect to SSH, then run:

```
cd /srv/comrad
git clone https://github.com/codefordenver/comrad.git .
git checkout master

cp .env-sample .env
nano .env
```

Change the Mongo_URI variable to use your application username and password for Mongo
Set a random value for SECRET_KEY to use to generate app session data
For MAIL_USER and MAIL_PASS, you'll want SMTP credentials for Comrad to send emails. One option is to go to Mailgun.org and sign up for an account. Use the SMTP credentials for MAIL_USER and MAIL_PASS
Change URL to the domain where Comrad will be hosted, without a trailing slash

Save the file

```
cd client
cp .env-sample .env

cd ../

npm install --production

cd client

npm install --production
npm run build

sudo npm install pm2@latest -g

pm2 serve build 3000 --spa
cd /var/logs
sudo mkdir comrad
sudo chown seanwilliams:comrad comrad
sudo chmod 770 comrad
sudo chmod g+s comrad
cd /srv/comrad
pm2 start server/index.js -l /var/log/comrad/api

pm2 startup systemd
```
Copy and paste the command from the last line that `pm2 startup systemd` output and run that command. Now pm2 will run on system startup

## Configure nginx

```
sudo nano /etc/nginx/sites-available/comrad.yourdomain.org
```

Use this for your nginx config (replacing the `server_name` variable with your domain):

```
server {
    server_name comrad.yourdomain.org;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        add_header Cache-Control "no-cache";
        expires 0;
        
        location /static/ { # cache non-html static files
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            expires 10d;
        }

    }
    location /api/ { # trailing slash here is important!
        proxy_pass http://localhost:5000/; # trailing slash here is important!
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Now, enable the site:
```
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/comrad.yourdomain.org /etc/nginx/sites-enabled/comrad.yourdomain.org
sudo nginx -t 
```

As long as `sudo nginx -t` reports that the configuration is good, we can restart nginx:

```
sudo service nginx restart
```

## Set up SSL

Set up SSL using Certbot / Let's Encrypt with these steps:

```
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update

sudo apt-get install certbot python3-certbot-nginx

sudo certbot --nginx
```

Follow the steps in the wizard to set up your certificate
Choose to redirect all requests to HTTPS



## DNS Creation
For the domain name you would like to use, set up a DNS A record pointing to your server's IP address

## Seed the database
TODO: We still need to create a utility that will create an initial user you can use to log into Comrad. 

Run the steps to seed the access control values using `npm run cli:ac` in https://github.com/codefordenver/Comrad/blob/development/docs/seeding_database.md (starting at step 6)

# Set up daily backups for MongoDB
SSH on as root

```
mkdir /db_backups
mkdir ~/scripts
touch ~/scripts/backup_mongo
nano ~/scripts/backup_mongo
```

Use this for the content of ~/scripts/backup_mongo, replacing "password" with your Mongo root password
```
#!/bin/sh
DIR=`date +%m%d%y`
DEST=/db_backups/$DIR
mkdir $DEST
mongodump --uri "mongodb://root:root password@localhost:27017/comrad?authSource=admin" -o $DEST
find /db_backups -maxdepth 1 -type d -mtime +30 -exec rm -r -f {} \;
```

Make the script executable with:
```
chmod u+x ~/scripts/backup_mongo
```

Then, add a cron job for this:
```
sudo crontab -e
```

Add this value to your cron file:

```
45 1 * * * cd /root/scripts && ./backup_mongo
```

Also, add this value for the script that regularly calculates popularity of library items (used in prioritizing search results):
```
55 1 * * * npm run calculatepopularity --prefix=/srv/comrad
```

# To update the code with new versions of Comrad
Going forward, when you need to update Comrad with the latest from source code, run these steps:
```
cd /srv/comrad
git pull
npm install --production
cd client
npm install --production
npm run build
pm2 restart index
pm2 restart static-page-server-3000
```