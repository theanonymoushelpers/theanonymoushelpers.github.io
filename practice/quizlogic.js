
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


//this includes data for quiz length
var dataQuizLength;

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
var checkButton = document.getElementById("checkButton")
var continueButton = document.getElementById("continueButton")

//speedscore variable
var speedUpper;
var speedMidRange;
var speedLower;
var speedTimer;
var speedPointsCount;


//bool controls whether check or continue function is ran
var isContinue = false;
var isDone = false;

var selection = document.getElementById("multiplechoice");
var selectedValue = selection.value;
var ansValue;

//controls which question is loaded
var i = 0;

//right/wrong count
var corr = 0;
var inco = 0;

//finds json file and saves questions into a variable.
fetch(directQ)
    .then(response => response.json())
    .then(data => {
        dataQA = data["questionList"]
        dataQuizLength = data["quCountMinusOne"]
        //console log validates data is loading correctly for debugging.
        console.log(data)
        console.log(data.quizID)
        questionDisplay.textContent = dataQA[i]["qu"]
        o1.textContent = dataQA[i]["a1"]
        o2.textContent = dataQA[i]["a2"]
        o3.textContent = dataQA[i]["a3"]
        o4.textContent = dataQA[i]["a4"]
        ansValue = dataQA[i]["ans"]
        speedUpper = dataQA[i]["timeUpper"]
        speedMidRange = dataQA[i]["timeMid"]
        speedLower = dataQA[i]["timeLower"]
       } )


checkButton.addEventListener('click', checkAnswer);
continueButton.addEventListener('click', loadNextQuestion);

setInterval(function () {speedTimer += 1; console.log(speedTimer)}, 1000);

function checkAnswer() {
    selectedValue = selection.value;
    checkButton.style.visibility = 'hidden';
    continueButton.style.visibility = 'visible';
    clearInterval();
    console.log(speedTimer);

    if (selectedValue == ansValue) {
        console.log("correct")
        console.log(ansValue)
        console.log(selectedValue)
        if (speedTimer < speedLower[i])
        {
            speedPointsCount +=3;
        }
        else {
        console.log("Not achieved")
        }
        if (speedTimer < speedMidRange[i])
        {
            speedPointsCount +=3;
        }
        else {
            console.log("Not achieved")
            }
        if (speedTimer < speedUpper[i])
        {
            speedPointsCount +=4;
        }
        else {
            console.log("Not achieved")
            }
        corr++;
        speedTimer = 0;
    }
    else console.log("wrong")
        console.log(ansValue)
        console.log(selectedValue)
        inco++;
        speedTimer = 0;
    }


function loadNextQuestion() {
    //if question count is less than 10, load next question, otherwise go to results page with context
    if (i < dataQuizLength) {
    i++;
    console.log(i)
    questionDisplay.textContent = dataQA[i]["qu"]
    o1.textContent = dataQA[i]["a1"]
    o2.textContent = dataQA[i]["a2"]
    o3.textContent = dataQA[i]["a3"]
    o4.textContent = dataQA[i]["a4"]
    ansValue = dataQA[i]["ans"];
    continueButton.style.visibility = 'hidden';
    checkButton.style.visibility = 'visible';
    setInterval(function () {speedTimer += 1}, 1000);
    }
    else {
        let redirectPage = (corrWrong, speedPointsAvg) => {

            var url = "results.html" +
                "?quizPercent=" + corrWrong + "&speedScore=" + speedPointsAvg;

            window.location.href = url;
        }

        redirectPage(corr/inco*100 + "%", speedPointsCount/(dataQuizLength+1)*100 + "%")
    }
    
}



//onclick of the button, change the id to continue button and change text to continue
//onclick of the continue button, change it back to check, add 1 to i, so loop repeats
