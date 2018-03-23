(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
let data = require('./data.js');
const mouse = require('./mouse.js');

const api = {
    handleRequest() {
        const reqSettings = new Request('/api', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
        const request = async () => {
            try {
                // Success handler
                const response = await fetch(reqSettings);
                data = await response.json();

                mouse.onMouseMovement(data);


            } catch (err) {
                // Error handler shows message in the DOM that the API request failed
            }

        }
        request();
    },
}

module.exports = api
},{"./data.js":3,"./mouse.js":7}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
let data = {

}

module.exports = data;
},{}],4:[function(require,module,exports){
const domElements = {
    halfWidth: window.innerWidth / 2,
    timeOut: 0,
    loader: document.querySelector('.loader'),
    loadingText: document.querySelector('.text'),
    heading: document.createElement("h1"),
    div: document.createElement("div"),
    placeholder: document.createElement("img"),
    container: document.querySelector('main'),
}

module.exports = domElements;
},{}],5:[function(require,module,exports){
const domElements = require('./dom.js');

const images = {
    count: 0,
    changeImages(obj) {
        let img = document.querySelector(".placeholder");
        img.src = obj[this.count].img;
        this.count += 1;

        if (this.count >= obj.length) {
            this.count = 0;
        }
    }
}
module.exports = images;
},{"./dom.js":4}],6:[function(require,module,exports){
const api = require('./api.js');
const domElements = require('./dom.js');

(function () {
    const app = {
        init() {
            domElements.placeholder.setAttribute("class", "placeholder");
            domElements.heading.appendChild(document.createTextNode("Move your mouse"));
            domElements.container.appendChild(domElements.heading);
            domElements.div.appendChild(domElements.placeholder);
            domElements.container.appendChild(domElements.div);
            api.handleRequest()
            window.addEventListener('resize', (event) => {
                domElements.halfWidth = window.innerWidth / 2;
            });
        }
    }

    app.init();
})();


},{"./api.js":1,"./dom.js":4}],7:[function(require,module,exports){
const domElements = require('./dom.js');
const images = require('./images.js');

const mouse = {
    mousePosition: 0,
    handleMouseMovement(event, collection) {
        if (domElements.halfWidth - 100 > event.pageX) {
            if (this.mousePosition !== 1) {
                this.mousePosition = 1;
                clearInterval(domElements.timeOut)
                images.count = 0;
                domElements.timeOut = setInterval(() => {
                    images.changeImages(collection.left);
                }, 500);
            }
        } else if (domElements.halfWidth + 100 < event.pageX) {
            if (this.mousePosition !== -1) {
                this.mousePosition = -1;
                clearInterval(domElements.timeOut)
                images.count = 0;
                domElements.timeOut = setInterval(() => {
                    images.changeImages(collection.right);
                }, 500);
            }
        } else {
            if (this.mousePosition !== 0) {
                this.mousePosition = 0;
                clearInterval(domElements.timeOut)
                images.count = 0;
                domElements.timeOut = setInterval(() => {
                    images.changeImages(collection.center);
                }, 500);
            }
        }
    },
    onMouseMovement(collection) {
        document.onmousemove = (e) => this.handleMouseMovement(e, collection);
    }
}

module.exports = mouse;
},{"./dom.js":4,"./images.js":5}]},{},[1,2,3,4,5,6,7]);
