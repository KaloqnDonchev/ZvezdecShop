const button = document.querySelector(".registerButton");

if (button) {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const rusername = document.getElementById("rusername").value;
        const rpassword = document.getElementById("rpassword").value;

        //Check if password 1 === password 2
        //Check if email is valid
        //FirstName and LastName atleast 2 symbols

        const remail = document.getElementById('remail').value;

        const fname = document.getElementById('rfirstname').value;
        const lname = document.getElementById('rlastname').value;

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