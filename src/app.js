const express = require('express');
const app = express();

const webpack = require('webpack');
const config = require('../webpack.dev.config.js');
const compiler = webpack(config);

const webpackHotMiddleware = require('webpack-hot-middleware');

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

require('dotenv').config();

var mongoUrl = 'mongodb+srv://admin123:admin321@cluster0-lk0al.mongodb.net/test';
let mongoDbObjects;
let productObjects = [];

const salt = process.env.ENCRYPTION_SALT;

function newDBConnection() {
    return new MongoClient(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

/*Connecting to the database*/
let client = newDBConnection();
client.connect(() => {
    const products = client.db('shop').collection('products');
    // perform actions on the collection object
    products.find().toArray().then((result) => {
        mongoDbObjects = result;

        client.close();
    });
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/webpages');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
    var elem1 = mongoDbObjects[0].db[0].data[0].products[0];
    var elem2 = mongoDbObjects[0].db[0].data[1].products[0];
    var elem3 = mongoDbObjects[0].db[0].data[2].products[0];

    var featuredItems = [elem1, elem2, elem3];

    var viewData = {
        featuredItems: featuredItems,
        pageName: 'Zvezdec Shop',
        currentPage: 'index page',
        numbers: [1, 3, 5, 4, 7, 9]
    };

    res.render('templates/index', viewData);
});

app.get('/signup', function (req, res) {
    var viewData = {
        currentPage: 'signup'
    };

    res.render('templates/loginform', viewData);
});

app.post('/signup', (request, response) => {
    var userObject = request.body;
    userObject.basket = {
        items: {},
        shipping: {},
        paymentMethod: {}

    };

    client = newDBConnection();

    client.connect(async () => {
        const userDB = client.db('shop').collection('users');
        const email = await userDB.findOne({
            email: userObject.email
        });

        const user = await userDB.findOne({
            username: userObject.username
        });
        if (!email && !user) {
            var mykey = crypto.createCipher('aes-128-cbc', salt);
            var mystr = mykey.update(userObject.password, 'utf8', 'hex');
            mystr += mykey.final('hex');

            userObject.password = mystr;

            userDB.insertOne(userObject, (err, res) => {
                if (err)
                    throw err;
            });
        }

        client.close();

        var result = {
            response: 'Registered successfully'
        };

        if (email || user) result.response = 'User with this account already exists';

        response.json(result);
    });
});

app.get('/login', function (req, res) {
    const viewData = {
        currentPage: 'login',
    };
    res.render('templates/loginform', viewData);
});

app.post('/login', function (req, res) {
    var loginInfo = req.body;

    client = newDBConnection();
    client.connect(async () => {
        var mykey = crypto.createCipher('aes-128-cbc', salt);
        var mystr = mykey.update(loginInfo.password, 'utf8', 'hex');
        mystr += mykey.final('hex');

        loginInfo.password = mystr;

        const userName = loginInfo.username;
        const password = loginInfo.password;

        const userObject = await client.db('shop').collection('users').findOne({
            username: userName,
            password: password
        });

        await client.close();

        var viewData = {
            user: userObject
        };

        if (userObject) {
            console.log('logged in');
            res.json(viewData);
        } else {
            res.send('Wrong username/password');
        }
    });
});

app.get('/catalog', (req, res) => {

    var gender = mongoDbObjects[0].db;
    var viewData = {
        catalog: gender
    };

    res.render('templates/catalog', viewData);
});

app.get('/contributions', (req, res) => {
    res.render('templates/contributions');
});

app.get('/itemboxes', (req, res) => {
    res.render('templates/itemboxes');
});

app.post('/get-product', (req, res) => {
    const productId = req.body;
    const foundObject = productObjects.find((element) => element.name == productId);

    res.json(foundObject);
});

app.get('/:gender', function (req, res) {
    const gender = mongoDbObjects[0].db;
    let renderError = true;

    gender.forEach((element) => {
        if (req.params.gender === element.name) {
            var viewData = {
                categories: element,
                path: req.params.gender,
            };

            res.render('templates/categories', viewData);
            renderError = false;
        }
    });

    if (renderError) {
        res.render('templates/error');
    }
});

app.get('/:gender/:product', function (req, res) {
    const gender = mongoDbObjects[0].db;
    let renderError = true;

    gender.forEach((genderElem) => {
        if (req.params.gender === genderElem.name) {
            const productKeys = genderElem.data;
            productKeys.forEach((item) => {
                if (req.params.product === item.name) {
                    var viewData = {
                        items: item.products,
                        path: req.params.gender + '/' + req.params.product
                    };
                    res.render('templates/PLP', viewData);
                    renderError = false;
                }

            });
        }
    });

    if (renderError) {
        res.render('templates/error');
    }
});

app.get('/:gender/:product/:id', function (req, res) {
    const gender = mongoDbObjects[0].db;
    let renderError = true;

    gender.forEach((genderElem) => {
        if (req.params.gender === genderElem.name) {
            const productKeys = genderElem.data;
            productKeys.forEach((item) => {
                if (req.params.product === item.name) {
                    const clothesName = item.products;
                    clothesName.forEach((itemName) => {
                        if (req.params.id === itemName.name) {
                            var viewData = {
                                item: itemName
                            };
                            res.render('templates/PDP', viewData);
                            renderError = false;
                        }
                    });

                }

            });
        }
    });

    if (renderError) {
        res.render('templates/error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});