const  express = require('express'),
    app = express()
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes/routing')
const feth = require('node-fetch')
const port = 4000;
const compression = require('compression');

app
    .use(express.static('views'))
    .use(express.static(path.join(__dirname, 'static')))
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded({extended: true}))
    .use(compression({filter: shouldCompress}))



// Tell express to use this router
app.use('/', router)    

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}

app.listen(port, function () {
    console.log(`localhost:${port} - Lets go Baby!`);
  });
