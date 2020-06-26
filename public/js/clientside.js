
    var button = document.querySelector(".registerButton");
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const rusername = document.getElementById("rusername").value;
        const rpassword = document.getElementById("rpassword").value;

        const ruser = {
            username: rusername,
            password: rpassword
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "signup", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(ruser));  

    })
