const express = require('express');
const router = express.Router();
const vision = require('@google-cloud/vision');
const fetch = require("node-fetch");

const people = [`https://charismamag-secure-charismamedia.netdna-ssl.com/images/stories/2017/life/Men/man-checking-out.jpg`, `https://static.pexels.com/photos/428341/pexels-photo-428341.jpeg`, `https://static.pexels.com/photos/733872/pexels-photo-733872.jpeg`, `https://www.gras.nl/AFBEELDINGEN/gras.jpg`, `https://i.kinja-img.com/gawker-media/image/upload/s--nTz2VDWV--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/pfctnvnbflbifoqfjvyt.jpg`]


const client = new vision.ImageAnnotatorClient({
    keyFilename: '/Users/fenna/Downloads/keys.json'
});

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
        LIMIT 100 OFFSET 400`;

    const encodedquery = encodeURIComponent(sparqlquery);

    const queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

    fetch(queryurl)
        .then((resp) => resp.json()) // transform the data into json
        .then(function (data) {
            let images = [];
            const rows = data.results.bindings; // get the results

            for (let i = 0; i < rows.length; ++i) {
                let image = {}
                image.url = rows[i]['img']['value']
                images.push(image);
            }
            res.json(images);
        })
        .catch(function (error) {
            // if there is any error you will catch them here
            console.log(error);
        });

});

module.exports = router;
