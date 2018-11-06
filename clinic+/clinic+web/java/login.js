// Initialize Firebase
var config = {
    apiKey: "AIzaSyBGZ6ASEt7g5T-tqLhN4EpwIrLm6RZijoQ",
    authDomain: "clinicplus02.firebaseapp.com",
    databaseURL: "https://clinicplus02.firebaseio.com",
    projectId: "clinicplus02",
    storageBucket: "clinicplus02.appspot.com",
    messagingSenderId: "962858937377"
};
firebase.initializeApp(config);

function log() {
    var correctEmail = "";
    var correctPassword = "";

    firebase.database().ref().child("login").once('value').then(function (snapshot) {
        correctEmail = snapshot.val().Email;
        correctPassword = snapshot.val().Password;
    });

    $("#login").click(function () {
        //Getting input values
        email = $('#txtEmail').val();
        password = $('#password').val();

        //Validation

        //If input matches firebase
        if (correctEmail == email && correctPassword == password) {
            //Promt Success
            alert("success");
            //Redirect Page
            $(location).attr('href', 'home.html')

            //Else, Promt Login Fail and not redirect
        }
        else {
            alert("Login Failed!");
        }
    });

}


var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



