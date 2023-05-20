

function getSetParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName)
}

var subjectS = getSetParameter('subject')
var nameS = getSetParameter('setName')

var directS = subjectS +  "/" + nameS + ".json"
console.log(directS);

//ID linked to score
var setID;

//this includes data for quiz length
var dataTotalCards = 1;

//this array stores info of json file
var dataSET;

//CARD number
var n = 0;

//if card is flipped
var flip = false;


        var cardDisplay = document.getElementById("flashcardW");
        var forwardButton = document.getElementById('forwardButton');
        var backwardButton = document.getElementById("backwardButton");
        var flipButton = document.getElementById("flipButton");



//TEST ON SERVER http://localhost:8000/Documents/GitHub/theanonymoushelpers.github.io/review/flashcard.html?subject=english&setName=litterms



fetch(directS)
    .then(response => response.json())
    .then(data => {
        setID = data["setID"]

        //add 10 000 to set ID to store match score, 20 000 to store written score, 30 000 to store last card opened from index, since ID's are six digit now 
        dataSET = data["cards"]


        dataTotalCards = dataSET.length;




 



 





       } )





       window.addEventListener("DOMContentLoaded", (event) => {
        cardDisplay = document.getElementById("flashcardW");
        forwardButton = document.getElementById('forwardButton');
        backwardButton = document.getElementById("backwardButton");
        flipButton = document.getElementById("flipButton");

        if (cardDisplay) {
            document.getElementById("flashcardW").innerHTML = dataSET[n]["term"];
            document.getElementById('flaschardNo').innerHTML = (n+1).toString; + "/" + (dataTotalCards+1).toString;
        }
        if (forwardButton) {
            forwardButton.addEventListener('click', forward);
        }
        if (backwardButton) {
            backwardButton.addEventListener('click', backward);
        }
        if (flipButton) {
            flipButton.addEventListener('click', flipCard);
        }

    });




//go forward button
function forward() {
       if (n < (dataTotalCards-1)) {
        n += 1;}
       else {n = 0}
       
       cardDisplay.textContent = dataSET[n]["term"];
       flip = false;

       document.getElementById('flaschardNo').innerHTML = (n+1).toString; + "/" + (dataTotalCards+1).toString;
    }

//go backward button
function backward() {
    if (n > 0) {
     n -= 1;}

    else {n = (dataTotalCards - 1)}

    cardDisplay.textContent = dataSET[n]["term"];
    flip = false;

    document.getElementById('flaschardNo').innerHTML = (n+1).toString; + "/" + (dataTotalCards+1).toString;

}

//flip button
function flipCard() {
    if (flip == false) {

        cardDisplay.textContent = dataSET[n]["definition"];
        flip = true;
    }
    else {

        cardDisplay.textContent = dataSET[n]["term"];
        flip = false;
    }
}