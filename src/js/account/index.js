var register = require('./register');
var login = require('./login');
var logout = require('./logout');
var addToCart = require('./addToCart');
var cart = require('../cart/cart');

var reqArray = [register, login, logout, addToCart, cart];
reqArray.forEach((element) =>{
    element.init();
});