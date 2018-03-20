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
