//Global Variable
const rootRef = firebase.database().ref().child("queue");

//const rootRef = firebase.database().ref().child("ClinicPlusFinalQueue");

//Document on load
$(document).ready(function () {
    //"child_added" indicates the event when a 'push' to DB happens
    rootRef.on("child_added", snap => {
        $("#tablebody").append("<tr><td class ='nameid'> " + snap.child("Name").val() + " </td><td class='NRIC'> "
            + snap.child("NRIC").val() + "</td><td><button id='delete-btn' > Remove</button> </td> </tr > ");

        //When remove button is clicked
        $('button').off().on('click', function () {
            //Get the name of user to be removed
            var removeName = $(this).closest("tr").find(".nameid").text();
            $(this).closest('tr').remove();

            //Get all data
            rootRef.once('value').then(function (snapshot) {
                //Loop through data and look for name that matches removeName
                $.each(snapshot.val(), function (key, jsonObj) {

                    if (jsonObj.Name == removeName.trim()) {
                        //Delete from DB
                        rootRef.child(key).remove();
                    }
                });
            });
        });
    });
});

//Select doctor Dropdownlist
function SelectDr() {

    //get doctor value
    var Doctor = document.getElementById("drSelect").value;

    //put value into a sentence 
    var Result = Doctor + " is currectly on duty";

    if (Doctor == "dr") {
        var Result = "Please Select a doctor"
    }

    //print sentence 
    document.getElementById("DrOutput").innerHTML = Result;


    //direction to firebase
    var docref = firebase.database().ref().child("ClinicDoctor");

    //.set to firebase, meaning replace value in firebase with the doctor selected 
    docref.child("Doctor").set(Doctor)
}

// insert data to firebase
function savedata() {
    //get name
    var message = $('#nameinput');

    //get nric
    var Nric = $('#NRIC');

    //push var to firebase
    rootRef.push(
        {
            Name: message.val(),
            NRIC: Nric.val()
        });

    //reset input after push
    message.val('');
    Nric.val('');
}


setInterval(function () {

    //get table length
    var x = document.getElementById("tablebody").rows.length;

    //print in html
    document.getElementById("countout").innerHTML = " Number of people in the queue : " + x;

    // direction to firebase
    var qcountRef = firebase.database().ref().child("Number of patients");
    // replace value with current value
    qcountRef.child("QueueCount").set(String(x))

}, 1000);  //loads function every 1 second




//sliding function

$(document).ready(function () {
    $('.slide').click(function (e) {
        var linkHref = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(linkHref).offset().top
        }, 1000);
        e.preventDefault();
    });
})
