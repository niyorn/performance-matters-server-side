(function () {
    const app = {
        halfWidth: window.innerWidth / 2,
        timeOut: 0,
        loader: document.querySelector('.loader'),
        loadingText: document.querySelector('.text'),
        heading: document.querySelector('h1'),
        subHeading: document.querySelector('h2'),
        details: document.querySelector('.details'),
        images:  document.getElementsByTagName('img'),
        init() {
            const length = this.images.length;
            for (let i = 0; i < length; i++) {
                this.images[0].parentNode.removeChild(this.images[0]);
            }
            for (let i = 0; i < this.subHeading.length; i++) {
                this.subHeading[0].parentNode.removeChild(this.subHeading[0]);
            }
            this.heading.classList.add('inactive');
            this.heading.innerHTML = "Move your mouse";
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
                    console.log(data)

                } catch (err) {
                    // Error handler shows message in the DOM that the API request failed
                }

            }
            request();
        },
    }


    const images = {
        count: 0,
        changeImages(obj) {
            let img = document.querySelector(".placeholder");
            img.src = obj[this.count].img;
            app.details.innerHTML = "age: " + obj[this.count].age;
            this.count += 1;

            if (this.count >= obj.length) {
                this.count = 0;
            }
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

