const  express = require('express'),
    app = express()
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes/routing')
const feth = require('node-fetch')
const port = 4000;

app
    .use(express.static('views'))
    .use(express.static(path.join(__dirname, 'static')))
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded({extended: true}))

// Tell express to use this router
app.use('/', router)    

app.listen(port, function () {
    console.log(`localhost:${port} - Lets go Baby!`);
  });
