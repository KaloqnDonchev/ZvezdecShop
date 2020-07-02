const button = document.querySelector(".registerButton");

if (button) {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const rusername = document.getElementById("rusername").value;
        const rpassword = document.getElementById("rpassword").value;

        const rconfirmpassword = document.getElementById('rconfirmpassword').value;

        const remail = document.getElementById('remail').value;

        const fname = document.getElementById('rfirstname').value;
        const lname = document.getElementById('rfamilyname').value;

        const formelem = document.getElementById("form");
        
        const failmsg = document.createElement("p");
        failmsg.id = "failmsg";

        const existingFailMessage = document.getElementById('failmsg');
        if (existingFailMessage) {
            existingFailMessage.remove();
        }

        function displayError(errorMessage) {
            failmsg.innerHTML = errorMessage;
            formelem.prepend(failmsg);
        }

        if (rpassword != rconfirmpassword) {
            displayError("Passwords don't match");
            return;
        }

        let regexPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        const match = remail.match(regexPattern);
        if (!match) {
            displayError("The email is not valid");
            return;
        }

        if(fname.length < 2 && lname.length < 2){
            displayError("Enter valid names");
            return;
        } 

        const ruser = {
            username: rusername,
            password: rpassword,
            email: remail,
            accountDetails: {
                firstName: fname,
                lastName: lname
            }
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "signup", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(ruser));
    });
}
