(function () {
    const app = {
        halfWidth: window.innerWidth / 2,
        timeOut: 0,
        loader: document.querySelector('.loader'),
        loadingText: document.querySelector('p'),
        heading: document.querySelector('h1'),
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
                    this.faceScan(data);

                } catch (err) {
                    // Error handler shows message in the DOM that the API request failed
                }

            }
            request();
        },
        faceScan(images) {
            // old fd321669869241c08bd3dbe67b6a1316
            // old https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect/
            const subscriptionKey = "df6dc32e785e451492fa214aa1f85fe7";
            const uriBase = "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect/";

            const params = {
                "returnFaceId": "true",
                "returnFaceLandmarks": "false",
                "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
            };

            let url = Object.keys(params).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
            }).join('&')


            let faces = [];
            let countDone = 0;

            let i = 0;
            const interval = setInterval(function(){
                let obj = images[i];
                fetch(uriBase + "?" + url, {
                    method: 'POST',
                    body: JSON.stringify(obj), // must match 'Content-Type' header
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key': subscriptionKey
                    })
                }).then(response => {
                    return response.json();
                }).then(data => {
                    countDone += 1;
                    document.querySelector('p').innerHTML = countDone + '/100 images scanned';
                    if (data.length > 0 && data.length < 2) {
                        let face = {};
                        face.panAngle = data[0].faceAttributes.headPose.yaw;
                        face.roll =  data[0].faceAttributes.headPose.roll;
                        face.img = obj.url;
                        faces.push(face)
                    }
                    if (images.length === countDone) {
                        collection.all = faces;
                        app.loader.classList.add("hidden");
                        app.loadingText.classList.add("hidden")
                        app.heading.classList.add("active")
                        mouse.onMouseMovement();
                    }
                    //render first three items
                }).catch(err => {
                    // Error :(
                    console.log(err);
                });
                i++;
                if(i === images.length) clearInterval(interval);
            }, 150);



            // data.forEach((obj, i) => {
            //     fetch(uriBase + "?" + url, {
            //         method: 'POST',
            //         body: JSON.stringify(obj), // must match 'Content-Type' header
            //         headers: new Headers({
            //             'Content-Type': 'application/json',
            //             'Ocp-Apim-Subscription-Key': subscriptionKey
            //         })
            //     }).then(response => {
            //         return response.json();
            //     }).then(data => {
            //         countDone += 1;
            //         if (data.length > 0) {
            //             let face = {};
            //             face.panAngle = data[0].faceAttributes.headPose.yaw;
            //             face.roll =  data[0].faceAttributes.headPose.roll;
            //             face.img = obj.url;
            //             faces.push(face)
            //         }
            //         if (images.length === countDone) {
            //             collection.all = faces;
            //             mouse.onMouseMovement();
            //         }
            //         //render first three items
            //     }).catch(err => {
            //         // Error :(
            //         console.log(err);
            //     });
            // });
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
                return obj.panAngle >= -5 && obj.panAngle <= 5 && obj.roll >= -5 && obj.roll <= 10;
            });
            return filteredCenter
        }

    }

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

