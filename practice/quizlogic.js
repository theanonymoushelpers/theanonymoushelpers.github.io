window.PageConfig = {
    before: (() => {
      let pagedResolve;
      let pagedPromise = new Promise((resolve) => {pagedResolve = resolve});
      
      MathJax.startup = {
        ready: () => {
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => pagedResolve());
        }
      };
      
      return () => pagedPromise;
    })()
  };

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
var dataQuizLength = 7;

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
var continueDiv = document.getElementById("continueDiv")
var solutionDiv = document.getElementById("solutionDiv")
var feedbackText = document.getElementById("feedbackText")
var solutionExpand = document.getElementById("solutionExpand")
var questionNumber = document.getElementById("questionNumber")
var solutionText = document.getElementById("sol-text") 
var titleofQuiz = document.getElementById("quizTitle") 

//speedscore variable
var speedUpper;
var speedMidRange;
var speedLower;
var speedTimer = 0;
var speedPointsCount = 0;

//go to reuslts page with context for answer key
var ansSubject = subjectQ;
var ansIdent = identQ;
var ansName = nameQ;


//bool controls whether check or continue function is ran
var isContinue = false;
var isDone = false;

var selection = document.getElementById("multiplechoice");
var selectedValue = selection.value;
var ansValue;

//controls which question is loaded
var i = 0;

//question number
var n = 0;

//completed questions for random question loading
var completedQuestions = [0];
var checkIfNew = false;

//function picks a random number
function randomQ() {
    while (checkIfNew === false) {
    i = Math.floor(Math.random() * (dataTotalQuestions-1));
    console.log("i is: " + i);
         for (let numCheck = 0; numCheck < completedQuestions.length; numCheck++) {
            if (i === completedQuestions[numCheck]) {
            checkIfNew = false;
            break;
            }
            else {
            checkIfNew = true;
            }
        }
    }
    completedQuestions[n] = i;
    checkIfNew = false;
}


//right/wrong count
var corr = 0;
var inco = 0;

//finds json file and saves questions into a variable.
fetch(directQ)
    .then(response => response.json())
    .then(data => {
        dataQA = data["questionList"]
        dataTotalQuestions = data["totalQuCount"]
        dataQuizLength = data["quCountToDisplay"]
        //console log validates data is loading correctly for debugging.
        console.log(data)
        console.log(data.quizID)
        i = Math.floor(Math.random() * (dataTotalQuestions-1));
        completedQuestions[n] = i;
        console.log("Questionbank: " + completedQuestions[n]);

        questionDisplay.textContent = dataQA[i]["qu"]
        o1.textContent = dataQA[i]["a1"]
        o2.textContent = dataQA[i]["a2"]
        o3.textContent = dataQA[i]["a3"]
        o4.textContent = dataQA[i]["a4"]
        ansValue = dataQA[i]["ans"]
        speedUpper = dataQA[i]["timeUpper"]
        speedMidRange = dataQA[i]["timeMid"]
        speedLower = dataQA[i]["timeLower"]
        solutionText.textContent = dataQA[i]["solution"]
        questionNumber.innerHTML = "Question " + (n+1) + " of " + (dataQuizLength);
        titleofQuiz.innerHTML = data["title"]
        console.log("Speed Upper Req:" + speedUpper)
       } )





checkButton.addEventListener('click', checkAnswer);
continueButton.addEventListener('click', loadNextQuestion);

setInterval(function() {speedTimer += 1; console.log("Tick:" + speedTimer)}, 1000);


function checkAnswer() {
    selectedValue = selection.value;
    checkButton.style.visibility = 'hidden';
    continueButton.style.visibility = 'visible';
    continueDiv.style.visibility = 'visible';
    solutionDiv.style.visibility = 'visible';
    clearInterval();
    console.log(speedTimer);

    if (selectedValue == ansValue) {
        console.log("correct")
        console.log(ansValue)
        console.log(selectedValue)
        console.log("Speed Upper Req:" + speedUpper)

        continueDiv.style.backgroundColor = '#d5ffd5';
        solutionDiv.style.backgroundColor = '#d5ffd5';
        feedbackText.style.color = '#348926';
        solutionExpand.style.color = '#348926';
        feedbackText.innerHTML = '&#10004; Great job!';
        continueButton.classList.remove('buttonStOr')
        continueButton.classList.add('buttonStGr')

        if (speedTimer < speedLower)
        {
            speedPointsCount +=3;
        }
        else {
        console.log("Not achieved")
        }
        if (speedTimer < speedMidRange)
        {
            speedPointsCount +=3;
        }
        else {
            console.log("Not achieved")
            }
        if (speedTimer < speedUpper)
        {
            speedPointsCount +=4;
        }
        else {
            console.log("Not achieved")
            }
        corr++;
        console.log("Speed timer:" + speedTimer);
        console.log("Total speed points:" + speedPointsCount);
        
    }
    else {console.log("wrong")
        console.log(ansValue)
        console.log(selectedValue)
        
        continueDiv.style.backgroundColor = '#ffeed0';
        solutionDiv.style.backgroundColor = '#ffeed0';
        feedbackText.style.color = '#8a5d16';
        solutionExpand.style.color = '#8a5d16';
        feedbackText.innerHTML = '&#33; Not quite.';
        continueButton.classList.remove('buttonStGr')
        continueButton.classList.add('buttonStOr')
        inco++;
        
    }
}

function loadNextQuestion() {

    //if question count is less than 7, load next question, otherwise go to results page with context
    if (n < (dataQuizLength-1)) {
    n++;
    console.log(n)
    questionNumber.innerHTML = "Question " + (n+1) + " of " + (dataQuizLength);
    randomQ();
    console.log("Questionbank: " + i);
    questionDisplay.textContent = dataQA[i]["qu"]
    o1.textContent = dataQA[i]["a1"]
    o2.textContent = dataQA[i]["a2"]
    o3.textContent = dataQA[i]["a3"]
    o4.textContent = dataQA[i]["a4"]
    ansValue = dataQA[i]["ans"];
    speedUpper = dataQA[i]["timeUpper"]
    speedMidRange = dataQA[i]["timeMid"]
    speedLower = dataQA[i]["timeLower"]
    solutionText.textContent = dataQA[i]["solution"]
    console.log("Speed Upper Req:" + speedUpper)
    continueButton.style.visibility = 'hidden';
    checkButton.style.visibility = 'visible';
    continueDiv.style.visibility = 'hidden';
    solutionDiv.style.visibility = 'hidden';
    MathJax.typesetPromise();
    speedTimer = 0;
    setInterval(function () {}, 1000);
    }
    else {
        let redirectPage = (corrWrong, speedPointsAvg, ansSubject, ansIdent, ansName) => {

            var url = "results.html" +
                "?quizPercent=" + corrWrong + "&speedScore=" + speedPointsAvg + "&ansSubject=" + ansSubject + "&ansIdent=" + ansIdent + "&ansName=" + ansName;

            window.location.href = url;
        }

        redirectPage(Math.round(corr/(dataQuizLength)*100) + "%", Math.round(speedPointsCount/(dataQuizLength)*10) + "%", subjectQ, identQ, nameQ)
    }
    
}



//onclick of the button, change the id to continue button and change text to continue
//onclick of the continue button, change it back to check, add 1 to i, so loop repeats
