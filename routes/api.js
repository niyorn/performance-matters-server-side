const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

router.get('/', function (req, res, next) {
    const sparqlquery = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX schema: <http://schema.org/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX void: <http://rdfs.org/ns/void#>
        SELECT * WHERE {
          ?cho dc:subject ?onderwerp .
          ?onderwerp a schema:Person .
          ?cho foaf:depiction ?img .
          ?cho dc:date ?date .
          ?cho void:inDataset ?dataset .
        }
        LIMIT 20 OFFSET 410`;

    const encodedquery = encodeURIComponent(sparqlquery);

    const queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

    fetch(queryurl)
        .then((resp) => resp.json()) // transform the data into json
        .then(function (data) {
            let images = [];
            const rows = data.results.bindings; // get the results
            for (let i = 0; i < rows.length; ++i) {
                let image = {};
                image.url = rows[i]['img']['value'];
                images.push(image);
            }
            faceScan(images);
            // res.json(images);
        })
        .catch(function (error) {
            // if there is any error you will catch them here
            console.log(error);
        });


    function faceScan(images) {
        const subscriptionKey = process.env.SUB_KEY;
        const uriBase = "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect/";

        const params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        let url = Object.keys(params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
        }).join('&');

        let faces = [];
        let countDone = 0;

        let i = 0;
        const interval = setInterval(function () {
            let obj = images[i];
            fetch(uriBase + "?" + url, {
                method: 'POST',
                body: JSON.stringify(obj), // must match 'Content-Type' header
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': subscriptionKey
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                countDone += 1;
                // app.loadingText.innerHTML = countDone + '/100 images scanned';
                if (data.length > 0 && data.length < 2) {
                    let face = {};
                    face.age = data[0].faceAttributes.age;
                    face.panAngle = data[0].faceAttributes.headPose.yaw;
                    face.roll = data[0].faceAttributes.headPose.roll;
                    face.img = obj.url;
                    faces.push(face)
                }
                if (images.length === countDone) {
                    // collection.all = faces;
                    // app.loader.classList.add("hidden");
                    // app.loadingText.classList.add("hidden")
                    // app.heading.classList.add("active")
                    // mouse.onMouseMovement();
                    // console.log(faces)
                }
                //render first three items
            }).catch(err => {
                // Error :(
                console.log(err);
            });
            i++;
            if (i === images.length) clearInterval(interval);
        }, 150);
    }

});

module.exports = router;
