# Portrets following mouse

Portrets from the city archive of Amsterdam follow the direction of the mouse by looking at it. The face position of the portrets is detected with the [Microsoft face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/).
*   [x] Works without JavaScript
*   [x] Server: [`express`][express]
*   [x] Templating: [`EJS`][EJS]
*   [x] Bundling server side: [`CommonJS`][CommonJS]
*   [x] Bundling client side: [`Browserify`][Browserify]

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

## To do
*   [] Improve performance
*   [] Add gzip
*   [] Minify JS and CSS
*   [] Improve styling
*   [] Add more content



