(function () {
    const app = {
        halfWidth: window.innerWidth / 2,
        timeOut: 0,
        init() {
            api.handleRequest()
            window.addEventListener('resize', (event) => {
                this.halfWidth = window.innerWidth / 2;
            })
        }
    }

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
                    const data = await response.json();
                    collection.all = data;
                    console.log(data)
                    mouse.onMouseMovement();

                } catch (err) {
                    // Error handler shows message in the DOM that the API request failed
                }

            }
            request();
        }
    }

    const collection = {
        all: [],
        filterLeft() {
            const filteredLeft = this.all.filter((obj) => {
                return obj.panAngle <= -10;
            });
            return filteredLeft
        },
        filterRight() {
            const filteredRight = this.all.filter((obj) => {
                return obj.panAngle >= 10;
            });
            return filteredRight
        },
        filterCenter() {
            const filteredCenter = this.all.filter((obj) => {
                return obj.panAngle >= -5 && obj.panAngle <= 5;
            });
            return filteredCenter
        }

    }

    const images = {
        count: 0,
        changeImages(obj) {
            let img = document.querySelector("img");
            img.src = obj[this.count].img;
            this.count += 1;

            if (this.count >= obj.length){
                this.count = 0;
            }

            // fadeImg(img, 100, true);
        }
    }

    const mouse = {
        mousePosition: 0,
        handleMouseMovement(event) {
            if (app.halfWidth - 100 > event.pageX) {
                if (this.mousePosition !== 1) {
                    this.mousePosition = 1;
                    const allImagesLeft = collection.filterLeft();
                    clearInterval(app.timeOut)
                    images.count = 0;
                    app.timeOut = setInterval(() => {
                        images.changeImages(allImagesLeft);
                    }, 500);
                }
            } else if (app.halfWidth + 100 < event.pageX) {
                if (this.mousePosition !== -1) {
                    this.mousePosition = -1;
                    let allImagesRight = collection.filterRight();
                    clearInterval(app.timeOut)
                    images.count = 0;
                    app.timeOut = setInterval(() => {
                        images.changeImages(allImagesRight);
                    }, 500);
                }
            } else {
                if (this.mousePosition !== 0) {
                    this.mousePosition = 0;
                    let allImagesCenter = collection.filterCenter();
                    clearInterval(app.timeOut)
                    images.count = 0;
                    app.timeOut = setInterval(() => {
                        images.changeImages(allImagesCenter);
                    }, 500);
                }
            }
        },
        onMouseMovement() {
            document.onmousemove = this.handleMouseMovement;
        }
    }

    app.init();
})();

