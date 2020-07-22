const Toastify = require('toastify-js');
const defautMessage = {
    duration: 3000,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)'
};
const showMessage = function(message){
    defautMessage.text = message;
    Toastify(defautMessage).showToast();
};

const expObj = {
    defaultMessage: defautMessage,
    showMessage: showMessage
};

module.exports = expObj;