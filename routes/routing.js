var fetch = require('node-fetch')
var fs = require('fs');
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
    //get the data
    fs.readFile('./data/lines2017.geojson', 'utf8', function (err, data) {
        if (err) throw err
        let info = JSON.parse(data)
        info = info.features
        res.render('main', {
            data: info,
        })
    })
})

router.get('/detail/:id', function (req, res) {
    let linenr = req.params.id;

    let sparqlquery =
        `PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        SELECT ?cho ?year ?img ?title ?description 
        WHERE {
            ?cho dc:description ?description .
            ?cho dc:title ?title .
            ?cho sem:hasBeginTimeStamp ?start .
            ?cho foaf:depiction ?img .
            BIND (year(xsd:dateTime(?start)) AS ?year) .
            FILTER REGEX(?description,"lijn ${linenr} [^0-9]", "i")  
        }
        ORDER BY ASC(?start)
        LIMIT 20
        `
    ;
    var encodedquery = encodeURIComponent(sparqlquery);
    var queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

    fetch(queryurl)
        .then((resp) => resp.json()) // transform the data into json
        .then(function (data) {
            let rows = data.results.bindings; // get the results
            let lineData = rows.map(function (i) {
                let data = {}
                data.photo = i.img.value;
                data.title = i.title.value
                data.description = i.description.value;
                data.year = i.year.value;
                return data;
            });

            res.render('detail', {
                data: lineData
            })
        })
        .catch(function (error) {
            // if there is any error you will catch them here
            res.render('error') //render error page
        });

})


module.exports = router