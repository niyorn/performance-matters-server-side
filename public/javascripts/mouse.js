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