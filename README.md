# Portrets following mouse

Portrets from the city archive of Amsterdam follow the direction of the mouse by looking at it. The face position of the portrets is detected with the [Microsoft face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/).
*   [x] Works without JavaScript
*   [x] Server: Express
*   [x] Templating: EJS
*   [x] Env: dotenv
*   [x] GZIP: Compression
*   [x] Bundling server side: CommonJS
*   [x] Bundling client side: Browserify

![Example webapp](https://github.com/fennadew/performance-matters-server-side/blob/master/public/images/example.gif)

## NPM scripts, CommonJS & Browserify
You can find the npm scripts in the `package.json` file under "scripts". When you run `npm start` your the terminal, `node app.js` will be executed.
`build-js` is a custom npm script so you need to run `npm run build-js` in your terminal. It will run browserify. This looks up all the scripts in the public/javascripts folder and bundles all modules in public/javascripts/bundle.js.
Browserify lets you require('modules') in the browser by bundling up all of your dependencies. Node does that automatically by using CommonJS.

  "scripts": {

    "start": "node app.js",
    "build-js": "browserify public/javascripts/*.js > public/javascripts/bundle.js"

  }

## Get started

* Run `$ git clone https://github.com/fennadew/performance-matters-server-side.git` in your terminal in the desired directory.

* `cd` to the repository and create a new file called vars.env
In this file, add a SUB_KEY= with a valid key from [Microsoft face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/).
This webapp is based on the free key with 20 calls/minute. 

* Run `npm install` to install all dependencies.

* Run `npm start` start the server.
App listens on `http://localhost:8000/`.

* To bundle the JavaScript files into bundle.js run `npm run bundle-js`.

## Perfomance
1. Added Gzip
added node module "compression" middleware for Node.js Express. The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options. (ref 1.)
Improves paint with 0.04sec and usable page with 0.12 sec on slow 3G.

<b>Before</b>
![Example webapp](https://github.com/fennadew/performance-matters-server-side/blob/master/public/images/voor.png)

<b>After</b>
![Example webapp](https://github.com/fennadew/performance-matters-server-side/blob/master/public/images/na.png)

## To do
*   [ ] Improve performance
*   [ x ] Add gzip
*   [ ] Minify JS and CSS
*   [ ] Improve styling
*   [ ] Add more content

## License
MIT © Fenna de Wilde

## Resources

[env](https://github.com/motdotla/dotenv)

[Compression](https://github.com/expressjs/compression)

[Express](https://github.com/expressjs/express)

[CommonJS](https://nodejs.org/docs/latest/api/modules.html)

[Browserify](http://browserify.org/)




