function deletePreviousError() {
    const existingFailMessage = document.getElementById('failmsg');
    if (existingFailMessage) {
        existingFailMessage.remove();
    }
}

function displayError(errorMessage) {
    deletePreviousError();

    var message = failmsg();
    message.id = 'failmsg';
    message.innerHTML = errorMessage;
    message.classList.add("errorMessage")
    formelem().prepend(message);
}

function emailValidation() {
    let regexEmailPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
    const match = remail().match(regexEmailPattern);
    if (!match) {
        displayError("The email is not valid");
        return false;
    }

    return true;
}

function passwordMustContain() {
    let regexPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    var matchPass = rpassword().match(regexPasswordPattern);
    if (!matchPass) {
        displayError("Password must contain at least 6 characters, at least one letter and one number");
        return false;
    }

    return true;
}

function matchingPasswords() {
    if (rpassword() != rconfirmpassword()) {
        displayError("Passwords don't match");
        return false;
    }

    return true;
}

function passwordValidation() {
    return passwordMustContain() && matchingPasswords();
}

function nameValidation() {
    if (fname().length < 2 || lname().length < 2) {
        displayError("Enter valid names");
        return false;
    }

    return true;
}

function validateForm() {
    return passwordValidation() && nameValidation() && emailValidation();
}

const rusername = () => document.getElementById("rusername").value;
const rpassword = () => document.getElementById("rpassword").value;

const rconfirmpassword = () => document.getElementById('rconfirmpassword').value;

const remail = () => document.getElementById('remail').value;

const fname = () => document.getElementById('rfirstname').value;
const lname = () => document.getElementById('rfamilyname').value;

const formelem = () => document.querySelector("form");
const failmsg = () => document.createElement("p");

var init = () => {

    const button = document.querySelector(".registerButton");

    if (button) {
        button.addEventListener("click", (e) => {
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
            }

            // send post request
            fetch('/signup', options).then((responseAsString) => {
                console.log(responseAsString);
                return responseAsString.json();
            }).then((messageObject) => {
                console.log(messageObject);
                displayError(messageObject.response);
            }).catch((err) => console.error(err));


        });
    }
}

var exportObj = {
    init: init,
    displayError: displayError
};

module.exports = exportObj;