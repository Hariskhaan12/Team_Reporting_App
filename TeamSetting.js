auth = firebase.auth();
database = firebase.database();
var TeamEmailSection = document.getElementById("MembersEmails");
firebase.auth().onAuthStateChanged(function (user) {
    database_ref = database.ref();
    datachk = database_ref.child('TeamsYouOwn/' + user.uid)
    datachk.once('value', ((snapshot) => {
        let data = snapshot.val();
        for (const prop in data) {
            database2 = database_ref.child('TeamSetting/' + data[prop].category)
            database2.once('value', (snapshot) => {
                let data2 = snapshot.val();
                TeamEmailSection.innerHTML = data2.email;
            })
        }
    }))

})
const save = () => {
    var user=auth.currentUser;
    database_ref = database.ref();
    datachk = database_ref.child('TeamsYouOwn/' + user.uid)
    let Questions={
        Q1:document.getElementById("Question1").value,
        Q2:document.getElementById("Question2").value,
        Q3:document.getElementById("Question3").value,
    }
    datachk.on('value', (snapshot) => {
        let data = snapshot.val();
        for (const prop in data) {
            database_ref.child('TeamMessages/' + data[prop].category).set(Questions);
        }
    })
    location.reload();
}


