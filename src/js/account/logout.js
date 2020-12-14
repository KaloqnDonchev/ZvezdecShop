const modalHtml = `
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <form>
    <input type="text" id="credit-key">
    <input type="submit">
    </form>
  </div>

</div>`;

var init = () => {
    var userString = localStorage.getItem('user');

    if (userString) {
        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHtml;
        document.body.append(modalElement);

        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName('close')[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = 'none';
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        var navRegisterButton = document.getElementById('navigation-register-button');
        var userObject = JSON.parse(userString);
        if (userObject && userObject.user && userObject.user.username) {
            navRegisterButton.textContent = userObject.user.username;

            var logout = document.getElementById('register-button');
            logout.removeAttribute('href');
            logout.innerHTML = 'Logout';
            const credit = document.getElementById('login-button');
            credit.removeAttribute('href');
            credit.innerHTML = 'Credit';

            credit.onclick = function () {
                modal.style.display = 'block';
            };

            const options = {
                method: 'POST',
                body: userString,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            logout.addEventListener('click', (event) => {
                event.preventDefault();
                fetch('/set-user-object', options);
                localStorage.removeItem('user');
                location.assign(document.location.origin);

            });
        }
    }
};

var logout = {
    init: init
};

module.exports = logout;