
function getQuizParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName)
}

var subjectQ = getQuizParameter('subject')
var identQ = getQuizParameter('ident')
var nameQ = getQuizParameter('quizName')
var questionN = getQuizParameter('questionNo')

var directQ = subjectQ + "/" + identQ + "/" + nameQ + ".json"
console.log(directQ);

//this array stores info of json file
var dataQA;

//all info to display
var questionDisplay = document.getElementById("quDisplay");
var o1 = document.getElementById("a1Display");
var o2 = document.getElementById("a2Display");
var o3 = document.getElementById("a3Display");
var o4 = document.getElementById("a4Display");
var ansNumber;
var ansExplain;

//integer controls which question is accessed
var i = 0;


//finds json file and saves questions into a variable.
fetch(directQ)
    .then(response => response.json())
    .then(data => {
        dataQA = data["questions"]
        //console log validates data is loading correctly for debugging.
        console.log(data) 
        console.log(data.quizID)
        questionDisplay.textContent = dataQA[i]["qu"]
        o1.textContent = dataQA[i]["a1"]
        o2.textContent = dataQA[i]["a2"]
        o3.textContent = dataQA[i]["a3"]
        o4.textContent = dataQA[i]["a4"]


        
       } )


