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

