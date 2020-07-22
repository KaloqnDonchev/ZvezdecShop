const Toastify = require('toastify-js');
const toastyObj = Toastify().options;

const defaultObjectPrefs = {
    duration: 3000,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
};

const showMessage = function(message, configObject) {
    Object.assign(defaultObjectPrefs, toastyObj);
    if (configObject) Object.assign(defaultObjectPrefs, configObject);
    defaultObjectPrefs.text = message;
    Toastify(defaultObjectPrefs).showToast();
};

const expObj = {
    showMessage: showMessage
};

module.exports = expObj;