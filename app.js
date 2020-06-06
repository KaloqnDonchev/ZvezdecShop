const express = require('express');
const app = express();

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

app.listen(3000, () => {
    console.log('Server up and running on port 3000');
});