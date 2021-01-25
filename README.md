# PusherCoins

This app demonstrates how to use ReactJS, Pusher, and Service Worker to build a realtime PWA.

[View tutorial](https://pusher.com/tutorials/pwa-react)

## MY CHANGES
- wrote start & postbuild scripts to deploy to Heroku in package.json
- wrote script to see lighthouse report for current build folder
- added dotenv to load app key secrets at runtime
- changed React client to load app key secrets at runtime
    - env vars must be prepended with REACT_APP* (eg: REACT_APP_KEY for env variable KEY)
- add source-map-explorer to analyze bundle.js
- preload env variables (remove references to dotenv)

## How to run this app

1. Clone the repo - `https://github.com/yomete/pushercoins`
2. Open `src/Today/Today.js`, and `server.js` and edit with your Pusher credentials which can be gotten from the [Pusher dashboard](https://pusher.com)
3. In the root of the project folder, run `npm install` to install all dependencies.
4. Then run `npm start` to get the app up and running.

## Built With

...

## Acknowledgements

...
