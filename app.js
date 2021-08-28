let flag = false;
let flag2 = false;
const SignUp = () => {
    location.reload();
    let new_data = {
        name: document.getElementById("name").value,
        email: document.getElementById("em").value,
        pass: document.getElementById("password").value
    };
    let check_object = (new_data) => {
        for (const key in new_data) {
            if (new_data[key] == "" || new_data[key] == null) {
                flag2 = true
            }


        }

    }
    check_object(new_data);
    if (flag2 == false) {
        let prev_data = localStorage.getItem("UserData");

        if (prev_data == null) {
            Users = [];

        }
        else {
            Users = JSON.parse(prev_data);
            let ch = JSON.parse(localStorage.getItem("UserData"));
            ch.forEach(element => {
                if (new_data.name == element.name) {

                    flag = true;
                }
            });
        }
        if (flag == false) {
            Users.push(new_data);
            localStorage.setItem("UserData", JSON.stringify(Users));
        }

        else if (flag == true) {
            alert("userName Already Taken");

        }
        else {
            alert("data is incomplete")
        }
    }
    else if (flag2 == true) {
        alert("All Fields must be filled")
    }
}
// login fucntionality

const login = () => {
    let loginflag=false;
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPass = document.getElementById("loginPass").value;
    let Record = JSON.parse(localStorage.getItem("UserData"));

    for (var i = 0; i < Record.length; i++) {
        if (Record[i].email == loginEmail && Record[i].pass == loginPass) {
            loginflag=true;
        }
    }
    if(loginflag==true)
    {
        console.log("congrats");
    }
    else{
        console.log("Sorry User not Registered.!")
    }

}



