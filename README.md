## Comrad

[![Stories Ready to Work On](https://badge.waffle.io/codefordenver/Comrad.svg?label=ready&title=Cards%20Ready%20To%20Work%20On)](https://waffle.io/codefordenver/Comrad)

## Table of Contents

- [What is Comrad?](#what-is-comrad)
- [Waffle Board](#waffle-board)
- [Heroku Link](#heroku-link)
- [Contribution Guide](#contribution-guide)
- [Pull Request Guide](#pull-request-guide)
- [On Boarding Details](#on-boarding-details)

## What is Comrad?

Comrad is an open-source web application for use by community radio stations that helps with crucial show scheduling and playlist entry to organize all on air and streaming processes for hosts and DJ’s. There is an initial version of it in use at KGNU in Boulder, CO, but the system needs several feature and usability improvements to bring it to the point where other community radio stations can adopt it.

This fellowship will allow the building of Comrad 2.0, permitting a standalone open source distribution in English and Spanish that will greatly benefit the small to mid-sized community radios as well as the hundreds of budget limited Lower Power FM radios just taking to the air in the United States.

![](./docs/images/ComradUI-1.png)

## Waffle Board

Use [the Waffle board](https://waffle.io/codefordenver/Comrad) for this repo to always know what to do next for your project!

## Heroku Link

## Contribution Guide

Here is what you need to know:

This project uses [GitHub flow](https://guides.github.com/introduction/flow/) where updates are made on feature branches. Pull requests are submitted on those branches and reviewed before being merged.

## Getting Started

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