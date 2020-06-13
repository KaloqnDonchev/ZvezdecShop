const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb+srv://admin123:admin321@cluster0-lk0al.mongodb.net/test';
let mongoDbObjects;

/*Connecting to the database*/
const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
client.connect((err) => {
    const collection = client.db("shop").collection("products");
    // perform actions on the collection object
    const cursor = collection.find().toArray().then((result) => {
        mongoDbObjects = result;
    });

    client.close();
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/webpages');

app.use(express.static('public'));

app.get('/', (req, res) => {
    // Currently looking for "index.ejs" inside /webpages
    var viewData = {
        pageName: 'Zvezdec Shop',
        currentPage: 'index page',
        numbers: [1, 3, 5, 4, 7, 9]
    };

    res.render('index', viewData);
});

app.get('/test', (req, res) => {
    res.send('This is test page located on localhost:3000/test <br> Welcome to the backend!');
});

app.get('/:gender', function (req, res) {
    const genderKeys = Object.keys(mongoDbObjects[0]);
    let renderError = true;

    genderKeys.forEach(element => {
        if (req.params.gender === element) {
            res.render('index');
            renderError = false;
        }

    });

    if (renderError) {
        res.send('<html><body><h1>Error</h1></body></html>'); // Check this later
    }
});

app.get('/:gender/:product', function (req, res) {
    const genderKeys = Object.keys(mongoDbObjects[0]);
    let renderError = true;

    genderKeys.forEach(genderName => {
        if (req.params.gender === genderName) {
            const productKeys = Object.keys(mongoDbObjects[0][genderName]);
            productKeys.forEach(product => {
                if (req.params.product === product) {
                    res.render('index');
                    renderError = false;
                }

            });
        }
    });
    
    if (renderError) {
        res.send('<html><body><h1>Error</h1></body></html>');
    }
});

app.listen(3000, () => {
    console.log('Server up and running on port 3000');
});



