auth = firebase.auth();
database = firebase.database();


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        database_ref = database.ref();
        Teamdatabase = database_ref.child('TeamsYouOwn/' + user.uid);
        let html = '';
        let OwnTeamSection = document.getElementById("OwnTeam");
        Teamdatabase.on('value', (snapshot) => {
            var data = snapshot.val();
            for (const prop in data) {
                html += `<div id="team">
            <div id="title"><strong>${data[prop].category}</strong></div>
            <div id="member"><strong>Members:</strong> ${data[prop].TeamEmail}</div>
        </div>`;
                
            }
            OwnTeamSection.innerHTML = html;
            if(html=='' || html==null)
            {
                document.getElementById("heading1").style.display="none";
                document.getElementById("welcomeheading").innerHTML="Welcome , "+user.email.split('@')[0];
            }
            else{
                document.getElementById("welcomeheading").style.display="none";
                document.getElementById("heading1").style.display="block";
            }
        });
        //Team you are partof check 
        Teampartdatabase = database_ref.child('TeamPartof/' + user.uid);

        Teamdatabase = database_ref.child('TeamsYouOwn');
        Teamdatabase.on('value', (snapshot) => {
            var partdata = snapshot.val();
            for (const prop in partdata) {
                let data2 = partdata[prop];
                for (const innerprop in data2) {
                    var totalEmail = data2[innerprop].TeamEmail;
                    var newemails = totalEmail.split(",");
                    // console.log(newemails);
                    for (i = 0; i < newemails.length; i++) {
                        if (newemails[i] == user.email) {
                            const partTeamdata = {
                                TeamName: data2[innerprop].TeamName,
                                category: data2[innerprop].category,
                                TeamEmail: data2[innerprop].TeamEmail
                            }
                            Teampartdatabase.child(data2[innerprop].TeamName).set(partTeamdata)
                        }

                    }
                }
            }
        })
        partTeamDatabase = database_ref.child('TeamPartof/' + user.uid);
        let html2 = '';
        let PartTeamSection = document.getElementById("PartTeam");
        partTeamDatabase.on('value', (snapshot) => {
            var data2 = snapshot.val();
            for (const prop in data2) {
                html2 += `<div id="team">
                <div id="title"><strong>${data2[prop].category}</strong></div>
                <div id="member"><strong>Members:</strong> ${data2[prop].TeamEmail}</div>
            </div>`;
            }
            PartTeamSection.innerHTML = html2;
            if(html2==null || html2==''){
                document.getElementById("heading2").style.display="none";
                document.getElementById("welcomeheading").innerHTML="Welcome , "+user.email.split('@')[0];

            }
            else{
                document.getElementById("welcomeheading").style.display="none";
                document.getElementById("heading2").style.display="block";
            }
        });
    }
    else {
        alert("Some Error Occured While fetching Your data")
    }
   
});
// -------------------------- Create team-----------------------
const CreateTeam = () => {
    var user = auth.currentUser;
    database_ref = database.ref();
    // whoever created team he will be admin
    const userdata = {
        admin: true
    }
    database_ref.child('Users/' + user.uid).update(userdata);

    // create object for teamdata and set into database under user id
    let OwnTeam = {
        TeamName: document.getElementById("TeamName").value,
        category: document.getElementById("category").value,
        TeamEmail: document.getElementById("TeamEmail").value
    }
    //set data into database 
    Teamdatabase = database_ref.child('TeamsYouOwn/' + user.uid)
    Teamdatabase.child(OwnTeam.TeamName).set(OwnTeam);


}
