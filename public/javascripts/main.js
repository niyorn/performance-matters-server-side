(function () {
    const app = {
        halfWidth: window.innerWidth / 2,
        timeOut: 0,
        loader: document.querySelector('.loader'),
        loadingText: document.querySelector('.text'),
        heading: {},
        div: {},
        placeholder: {},
        details: {},
        container: document.querySelector('main'),
        init() {
            api.handleRequest()
            window.addEventListener('resize', (event) => {
                this.halfWidth = window.innerWidth / 2;
            })
        }
    }

    let data = {

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
                    data = await response.json();

                    app.heading = document.createElement("h1");
                    app.details = document.createElement("p");
                    app.div = document.createElement("div");
                    app.placeholder =  document.createElement("img");
                    app.details.setAttribute("class", "details");
                    app.placeholder.setAttribute("class", "placeholder");
                    app.heading.appendChild(document.createTextNode("Move your mouse"));
                    app.container.appendChild(app.heading);
                    app.container.appendChild(app.details);
                    app.div.appendChild(app.placeholder);
                    app.container.appendChild(app.div);

                    mouse.onMouseMovement();


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
                    clearInterval(app.timeOut)
                    images.count = 0;
                    app.timeOut = setInterval(() => {
                        images.changeImages(data.left);
                    }, 500);
                }
            } else if (app.halfWidth + 100 < event.pageX) {
                if (this.mousePosition !== -1) {
                    this.mousePosition = -1;
                    clearInterval(app.timeOut)
                    images.count = 0;
                    app.timeOut = setInterval(() => {
                        images.changeImages(data.right);
                    }, 500);
                }
            } else {
                if (this.mousePosition !== 0) {
                    this.mousePosition = 0;
                    clearInterval(app.timeOut)
                    images.count = 0;
                    app.timeOut = setInterval(() => {
                        images.changeImages(data.center);
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

