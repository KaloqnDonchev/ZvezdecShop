var register = require('./register');
var login = require('./login');
var logout = require('./logout');
var addToCart = require('./addToCart');

var reqArray = [register, login, logout, addToCart];
reqArray.forEach((element) =>{
    element.init();
});