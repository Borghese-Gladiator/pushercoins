// preloaded env variables
const { PORT, APP_ID, KEY, SECRET, CLUSTER } = require('./config');

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')

const pusher = new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: CLUSTER,
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

app.set('port', (PORT || 5000))

// HEROKU - serve build folder
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname,' build', 'index.html'));
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