const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;



var mongoUrl = 'mongodb+srv://admin123:admin321@cluster0-lk0al.mongodb.net/test';
let mongoDbObjects;

function newDBConnection() {
    return new MongoClient(mongoUrl, {  useNewUrlParser: true, useUnifiedTopology: true, });
}

/*Connecting to the database*/
let client = newDBConnection();
client.connect(() => {
    const products = client.db("shop").collection("products");
    // perform actions on the collection object
    products.find().toArray().then((result) => {
        mongoDbObjects = result;

        client.close();
    });
});



app.set('view engine', 'ejs');
app.set('views', __dirname + '/webpages');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/signup', function(req, res){
    res.render('loginform');
});

app.post('/signup', (request,response) => {
    var userObject = request.body;

    client = newDBConnection();
    client.connect(async () => {
        const users = await client.db("shop").collection("users");
        const email = await users.findOne({
            email: userObject.email
        });

        if (!email){
            const user = await users.findOne({
                username: userObject.username
            });

            if(!user){
                await users.insertOne(userObject, (err,res) =>{
                    if (err) throw err;
                });
            }
        }
        client.close();
    });
});

app.get('/:gender', function (req, res) {
    const genderKeys = Object.keys(mongoDbObjects[0]);
    let renderError = true;

    genderKeys.forEach(element => {
        if (req.params.gender === element) {
            var viewData = {
                categories: mongoDbObjects[0][element],
                path: req.params.gender,
            };

            res.render('categories', viewData);
            renderError = false;
        }
    });

    if (renderError) {
        res.render('error');
    }
});

app.get('/:gender/:product', function (req, res) {
    const genderKeys = Object.keys(mongoDbObjects[0]);
    let renderError = true;

    genderKeys.forEach(genderName => {
        if (req.params.gender === genderName) {
            const productKeys = mongoDbObjects[0][genderName];
            productKeys.forEach(item => {
                if (req.params.product === item.name) {
                    var viewData = {
                        items: item.products,
                        path: req.params.gender + '/' + req.params.product
                    };
                    res.render('PLP', viewData);
                    renderError = false;
                }

            });
        }
    });

    if (renderError) {
        res.render('error');
    }
});



app.listen(3000, () => {
    console.log('Server up and running on port 3000');
});
