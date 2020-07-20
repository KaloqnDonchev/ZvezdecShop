var init = () => {
    var userString = localStorage.getItem('user');

    if (userString) {
        var navRegisterButton = document.getElementById('navigation-register-button');
        var userObject = JSON.parse(userString);
        navRegisterButton.textContent = userObject.user.username;

        document.getElementById('login-button').remove();
        var logout = document.getElementById('register-button');
        logout.removeAttribute('href');
        logout.innerHTML = 'Logout';

        logout.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('user');
            location.assign(document.location.origin);

        });
    }
};

var logout = {
    init: init
};

module.exports = logout;