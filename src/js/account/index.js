var register = require("./register");
var login = require("./login");
var logout = require("./logout")

var reqArray = [register, login, logout];
reqArray.forEach((element) =>{
    element.init();
});