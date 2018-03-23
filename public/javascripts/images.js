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