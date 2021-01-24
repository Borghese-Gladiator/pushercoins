require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    encrypted: true,
    useTLS: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

app.set('port', (5000 || process.env.PORT))

console.log(process.env.NODE_ENV);

// HEROKU - serve build folder
if (process.env.NODE_ENV === 'production') {
    const buildFolder = path.join(__dirname, '../', 'client/build')
    // load the value in the server
    const { API_URL, CLUSTER } = process.env;
    // treat the index.html as a template and substitute the value
    // at runtime
    app.set('views', path.join(__dirname, buildFolder));
    app.engine('html', require('ejs').renderFile);
    app.use(
        '/static',
        express.static(path.join(__dirname, `${buildFolder}/static`)),
    );
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.render('index.html', { API_URL, CLUSTER })
    });
}

app.post('/prices/new', (req, res) => {
    pusher.trigger('coin-prices', 'prices', {
        prices: req.body.prices
    });
    res.sendStatus(200);
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})