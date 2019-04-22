# Getting Started

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

Use `npm run` to see a list of available commands.

To configure your environment variables (e.g. for database connection) ask a maintainer for the details.

Troubleshooting
===============

Create React App / babel-loader dependency issue
---------------

If, on using `npm run [command]`, you receive an error like the following:

```
[1] There might be a problem with the project dependency tree.
[1] It is likely not a bug in Create React App, but something you need to fix locally.
[1]
[1] The react-scripts package provided by Create React App requires a dependency:
[1]
[1]   "babel-loader": "8.0.4"
[1]
[1] Don't try to install it manually: your package manager does it automatically.
[1] However, a different version of babel-loader was detected higher up in the tree:
```

Then, open/create the `.env` file in the client folder and add the line `SKIP_PREFLIGHT_CHECK=true`
