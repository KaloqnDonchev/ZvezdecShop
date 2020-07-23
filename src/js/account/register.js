const messageLib = require('../libraries/showMessage');

function emailValidation() {
    let regexEmailPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
    const match = remail().match(regexEmailPattern);
    if (!match) {
        messageLib.showMessage('The email is not valid');
        return false;
    }

    return true;
}

function passwordMustContain() {
    let regexPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    var matchPass = rpassword().match(regexPasswordPattern);
    if (!matchPass) {
        messageLib.showMessage('Password must contain at least 6 characters, at least one letter and one number');
        return false;
    }

    return true;
}

function matchingPasswords() {
    if (rpassword() != rconfirmpassword()) {
        messageLib.showMessage('Passwords don\'t match');
        return false;
    }

    return true;
}

function passwordValidation() {
    return passwordMustContain() && matchingPasswords();
}

function nameValidation() {
    if (fname().length < 2 || lname().length < 2) {
        messageLib.showMessage('Enter valid names');
        return false;
    }

    return true;
}

function validateForm() {
    return passwordValidation() && nameValidation() && emailValidation();
}

const rusername = () => document.getElementById('rusername').value;
const rpassword = () => document.getElementById('rpassword').value;

const rconfirmpassword = () => document.getElementById('rconfirmpassword').value;

const remail = () => document.getElementById('remail').value;

const fname = () => document.getElementById('rfirstname').value;
const lname = () => document.getElementById('rfamilyname').value;

var init = () => {

    const button = document.querySelector('#regButton.registerButton');

    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            if (!validateForm()) return null;

            const ruser = {
                username: rusername(),
                password: rpassword(),
                email: remail(),
                accountDetails: {
                    firstName: fname(),
                    lastName: lname()
                }
            };


            const options = {
                method: 'POST',
                body: JSON.stringify(ruser),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // send post request
            fetch('/signup', options).then((responseAsString) => {
                return responseAsString.json();
            }).then((messageObject) => {
                messageLib.showMessage(messageObject.response);
            }).catch((err) => messageLib.showMessage(err));


        });
    }
};

var exportObj = {
    init: init
};

module.exports = exportObj;