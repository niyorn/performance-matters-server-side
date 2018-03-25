var fs = require('fs');
var fetch = require('node-fetch')

module.exports =  {
	 app: {
		init: function () {
            fs.readFile('./data/lines1911.geojson', 'utf8', function (err, data) {
                if (err) throw err; 
                let obj = JSON.parse(data);
			});
			
			console.log(map)
		}
	},
	 map: {
		init: function () {

			//This is the map that will be displayed on the page
			let baseMap = L.tileLayer('https://api.mapbox.com/styles/v1/niyorn/cjehktoh06k1z2ss4q19r8y8h/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibml5b3JuIiwiYSI6ImNqZWZyM3dtbTM0bjYyeXBlc2NiMGY5NjAifQ.Lmc1QefltWWZ7PdoVMrPXA', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.streets',
			});

			//render the map in html
			let map = L.map('map', {
				center: [52.3697856, 4.89738837],
				zoom: 13.4,
				minZoom: 12.7,
				layers: [baseMap]
			});

			//In collector we will save the map object so that we're able to call the map
			//in other function
			collector.map = map;

			//Render the tram and metro line on the map
			this.geo();
		},
		geo: function () {
			let transport1911 = new L.LayerGroup(),
				transport2017 = new L.LayerGroup(),
				transport2018 = new L.LayerGroup();

			//get all the data file
			fetch('lines1911.geojson')
				.then(response => {
					console.log(response.json())
					return response.json()})
				.then(json => {
					L.geoJson(json.features, {
						style: function (i) {
							let type = i.properties.linetype;
							let lineNr = i.properties.linenr
							return checkType(type, lineNr);
						},
						onEachFeature: function (i, layer) {
							layer.on('click', function (e) {
								let info = {};
								info.headTitle = i.properties.linelabel;
								info.wiki = i.properties.linewiki;

								//render info in html
								Transparency.render(document.querySelector('.info'), info)

								//get extra infomation
								let linenr = i.properties.linenr;
								let infoContainer = document.querySelector('.info');
								infoContainer.classList.remove('hide');
								infoContainer.classList.add('show')
								api.get(linenr)

							});

							//When hover a line we wants to display what kind of line it is.
							layer.on('mouseover', function () {
								let data = {};
								data.title = i.properties.linelabel;
								Transparency.render(document.querySelector('.indicator'), data)

							});

							//Show nothing when we're not hovering over the line
							layer.on('mouseout', function () {
								document.querySelector('.indicator p').innerHTML = "";
							});
						}
					}).addTo(transport1911)
				})
				.catch(()=>'lol')

			fetch('lines2017.geojson')
				.then(response => response.json())
				.then(json => {
					L.geoJson(json.features, {
						style: function (i) {
							let type = i.properties.linetype;
							let lineNr = i.properties.linenr
							return checkType(type, lineNr);
						},
						onEachFeature: function (i, layer) {
							layer.on('click', function (e) {
								let info = {};
								info.headTitle = i.properties.linelabel;
								info.wiki = i.properties.linewiki;

								//render info in html
								Transparency.render(document.querySelector('.info'), info)

								//get extra infomation
								let linenr = i.properties.linenr;
								let infoContainer = document.querySelector('.info');
								infoContainer.classList.remove('hide');
								infoContainer.classList.add('show')
								api.get(linenr)

							});

							//When hover a line we wants to display what kind of line it is.
							layer.on('mouseover', function () {
								let data = {};
								data.title = i.properties.linelabel;
								Transparency.render(document.querySelector('.indicator'), data)

							});

							//Show nothing when we're not hovering over the line
							layer.on('mouseout', function () {
								document.querySelector('.indicator p').innerHTML = "";
							});

						}
					}).addTo(transport2017)
				});

			fetch('lines2018.geojson')
				.then(response => response.json())
				.then(json => {
					L.geoJson(json.features, {
						style: function (i) {
							let type = i.properties.linetype;
							let lineNr = i.properties.linenr
							return checkType(type, lineNr);
						},
						onEachFeature: function (i, layer) {
							layer.on('click', function (e) {
								let info = {};
								info.headTitle = i.properties.linelabel;
								info.wiki = i.properties.linewiki;

								//render info in html
								Transparency.render(document.querySelector('.info'), info)

								//get extra infomation
								let linenr = i.properties.linenr;
								let infoContainer = document.querySelector('.info');
								infoContainer.classList.remove('hide');
								infoContainer.classList.add('show')
								api.get(linenr)

							});

							//When hover a line we wants to display what kind of line it is.
							layer.on('mouseover', function () {
								let data = {};
								data.title = i.properties.linelabel;
								Transparency.render(document.querySelector('.indicator'), data)

							});

							//Show nothing when we're not hovering over the line
							layer.on('mouseout', function () {
								document.querySelector('.indicator p').innerHTML = "";
							})
						}
					}).addTo(transport2018)
				});

			//these are all of our control options
			let overlayMaps = {
				'1911': transport1911,
				'2017': transport2017,
				'2018': transport2018
			};

			//We want to differentiate between diffrent transportion vehicle 
			function checkType(type, lineNr) {
				if (type === 'tramlijn') {
					let colorLine = '';
					//lineNr is a string, so we need to convert it to a number,
					// so that we're able to compare it
					switch (Number(lineNr)) {
						case 1:
							colorLine = '#FF5722';
							break;
						case 2:
							colorLine = '#FFF9C4'
							break;
						case 3:
							colorLine = '#CE93D8'
							break;
						case 4:
							colorLine = '#FF3D00'
							break;
						case 5:
							colorLine = '#FFAB91'
							break;
						case 6:
							colorLine = '#FFAB40'
							break;
						case 7:
							colorLine = '#FFD740'
							break;
						case 8:
							colorLine = '#FF1744'
							break;
						case 9:
							colorLine = '#F50057'
							break;
						case 10:
							colorLine = '#D500F9'
							break;
						case 11:
							colorLine = '#651FFF'
							break;
						case 12:
							colorLine = '#3D5AFE'
							break;
						case 13:
							colorLine = '#00BFA5'
							break;
						case 14:
							colorLine = '#00C853'
							break;
						case 16:
							colorLine = '#64DD17'
							break;
						case 17:
							colorLine = '#AEEA00'
							break;
						case 24:
							colorLine = '#EC407A'
							break;
						case 26:
							colorLine = '#4A148C'
							break;
					}
					return {
						color: colorLine,
						dashArray: 5,
						className: 'tram'
					}
				} else if (type === 'metrolijn') {
					let colorLine = '';
					switch (Number(lineNr)) {
						case 50:
							colorLine = '#DD2C00'
							break;
						case 51:
							colorLine = '#FF6E40'
							break;
						case 52:
							colorLine = '#FFCCBC'
							break;
						case 53:
							colorLine = '#FF9100'
							break;
						case 54:
							colorLine = '#FFE0B2'
							break;
					}
					return {
						color: colorLine,
						opacity: 0.67,
						weight: 4,
						className: 'metro'
					}
				} else {
					return {
						color: '#9E9E9E'
					}
				}
			}
			//create the control and add it to the map
			L.control.layers(overlayMaps).addTo(collector.map);
		}
	},
	api: {
		get: function (linenr) {

			var pindakaas = 'dit is een pindakaas';

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
					`;

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

					let directive = {
						photo: {
							src: function () {
								return this.photo
							},
							alt: function () {
								return this.title
							}
							
						}
					}

					Transparency.render(document.querySelector('.info .img-container'), lineData, directive);
				})
				.catch(function (error) {
					// if there is any error you will catch them here
					console.log(error);
				});
		}
    }, collector: {
		//save the map object
		map: {},
		year: '',
		layer: []
    }   
}