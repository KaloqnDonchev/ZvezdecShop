const notificationLib = require('../libraries/showMessage');
const messageLib = require('../libraries/showMessage');

var init = () => {

    const buttonLogin = document.getElementById('loginbtn');

    if (buttonLogin) {
        buttonLogin.addEventListener('click', (event) => {

            event.preventDefault();

            const username = document.getElementById('lusername').value;
            const password = document.getElementById('lpassword').value;

            const luser = {
                username: username,
                password: password
            };

            const options = {
                method: 'POST',
                body: JSON.stringify(luser),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // send post request
            fetch('/login', options).then((responseAsString) => {
                return responseAsString.json();
            }).then((response) => {
                if (response.errorMessage) {
                    messageLib.showMessage(response.errorMessage);
                } else {
                    var objectAsString = JSON.stringify(response);
                    localStorage.setItem('user', objectAsString);
                    location.assign(document.location.origin);
                }
            }).catch((err) => notificationLib.showMessage(err));
        });

    }
};

var login = {
    init: init
};

module.exports = login;