## Getting Started

### 1. Clone the project and install dependencies

Clone and install dependencies in both the root directory and in `client/`:

```shell
$ git clone https://github.com/codefordenver/Comrad.git
# ...
$ cd Comrad/
$ npm ci
# ...
$ cd client/
$ npm ci
# ...
```

_Note the use of the npm `ci` command instead of `install`: this installs the exact package versions specified in `package-lock.json` rather than the fuzzy-matched versions in `package.json`, thus giving you a more exact replica of the dependencies and avoiding [much confusion](https://stackoverflow.com/questions/45022048/why-does-npm-install-rewrite-package-lock-json)._

### 2. Set up environment files

Copy the file at `client/.env-sample` to `client/.env`. Edit the `client/.env` file and change the `REACT_APP_API_SERVER_URL` value to `http://localhost:5000`

Copy the file at `.env-sample` to `.env`. Change the following variables:
- `MONGO_URI`: Set to the connection string of a local Mongo DB
- `SECRET_KEY`: Set to a random string of letters/numbers. Used to encode sessions.
- `USE_SECURE_COOKIES`: Change to `false`
- If you're testing any email functionality, you'll set `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, and `MAIL_PASS` to values for an email provider like [Mailtrap](https://mailtrap.io) or [Mailgun](https://mailgun.com). Please contact [info@getcomrad.org](mailto:info@getcomrad.org) if you'd like to use our development credentials for this.

### 3. Seeding the database

Now, we'll seed the development database with test data. Follow the instructions [here](seeding_database.md) to seed the database.

### 4. Run the project

Now, the project can be run locally with `npm run dev`
