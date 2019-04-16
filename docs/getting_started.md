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
