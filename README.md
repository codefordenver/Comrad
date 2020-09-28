## Comrad

[Highest Priority Issues](https://github.com/codefordenver/Comrad/projects/24)

[API Documentation (In Progress)](https://apidocs.getcomrad.org)

Currently, we are in the process of doing a beta test of Comrad with KGNU. The project board linked above reflects the high priority issues that have come up in beta testing with KGNU.

## Table of Contents

- [What is Comrad?](./docs/comrad.md)
- Guides
    - [Getting Started](./docs/getting_started.md)
    - [Testing](./docs/testing.md)

## What is Comrad?

Comrad is an open-source web application for use by community radio stations that helps with crucial show scheduling and playlist entry to organize all on air and streaming processes for hosts and DJ’s. There is an initial version of it in use at KGNU in Boulder, CO, but the system needs several feature and usability improvements to bring it to the point where other community radio stations can adopt it.

This fellowship will allow the building of Comrad 2.0, permitting a standalone open source distribution in English and Spanish that will greatly benefit the small to mid-sized community radios as well as the hundreds of budget limited Lower Power FM radios just taking to the air in the United States.

![](./docs/images/ComradUI-1.png)

## Running Debugger
1. Setup the VS Code Node Debugger
  - Got to the debug window
  - Add a new configuration to the VS Code launch.json file using the 'Node:Attach' method.  The configuration will look like this:
  ```json
    "configurations": [
      
      {
        "type": "node",
        "request": "attach",
        "name": "Attach",
        "port": 9229
      },
    ]
  ```

2. Start Comrad using the node debug command, this starts the server in debug mode `npm run debug`

3. Once the node server is fully running, navigate back to the debug tab and press the play button with the 'Attach' configuration selected

4. The debugger should now be running and will stop at any breakpoints on the backend server

5. For debugging the front end server (React) use the Google Chrome debugger
  - Install the 'Debugger for Chrome' VS Code plugin
  - Add the launch or attach debugger for chrome to the configuration files (For the launch debugger you can set the url to `"url": "http://localhost:3000"`, in order to launch to the proper localhost port)
  - Run the regular npm server using `npm run dev`
  - Note:  If you are having trouble with the proxy requests to the backend while debugging, try closing all chrome tabs, running the `Launch Chrome` debug configuration, and running `npm run dev`.
  - The `Launch Chrome` configuration should look like:
  ```json
    {
    "type": "chrome",
    "request": "launch",
    "name": "Launch Chrome",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceFolder}"
    },
  ```

For more information on the VS Code debugger:
 - VS Code Debugging reference: https://code.visualstudio.com/docs/nodejs/nodejs-debugging
 - VS Code Google Chrome Debugger:  https://github.com/Microsoft/vscode-chrome-debug
