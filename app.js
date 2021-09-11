const auth=firebase.auth();
const database=firebase.database();
const SignUp = () => {
    
    document.getElementById("SignUp").addEventListener('submit',(event)=>{
        event.preventDefault();
    })
    
        email= document.getElementById("em").value,
        pass=document.getElementById("password").value
    

    auth.createUserWithEmailAndPassword(email,pass)
    .then(()=>{
        var user=auth.currentUser;
        var database_ref=database.ref();
        let userdata={
            admin:false,
            name:document.getElementById("name").value,
            email:document.getElementById("em").value,
            pass:document.getElementById("password").value
        };
        database_ref.child('Users/'+ user.uid).set(userdata);
        alert("SignUp succesfully")
        
    })
    .catch((error)=>{
        alert(error.message);
    })
}

// login fucntionality
    const login = () => {
    
    document.getElementById("login").addEventListener('submit',(event)=>{
        event.preventDefault();
    })
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPass = document.getElementById("loginPass").value;

auth.signInWithEmailAndPassword(loginEmail,loginPass)
.then(()=>{
    alert("Login Succesfully..!");
    location.href=('Teams.html');
})
.catch((error)=>{
    alert(error.message);
})
}


