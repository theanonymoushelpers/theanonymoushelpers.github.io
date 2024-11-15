



import { GoogleGenerativeAI } from "@google/generative-ai";

//define API key (USE TAH ACCOUNT TO GENERATE)
const genAI = new GoogleGenerativeAI(API_KEY);





async function runFeedbackDef(question, expAnswer, actAnswer) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "The user was asked the question" + question + ". The answer they gave was" + userAnswer + ", but the actual answer was" + definedAnswer + ". Explain concisely, speaking directly to the user, what step they may have gotten wrong."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}


async function runFeedbackUndef(question, expAnswer, actAnswer, n) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Compare the users answer to the" + expAnswer + "for a maximum of" + n + "marks if the answer is right the following question:" + question + "Output the following information. On the first line, output the number of marks awarded. On the next line, output an explanation of why certain marks weren't awarded and how the answer can be improved. User answer: " + actAnswer;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }



//can be used for multiple choice, short answer
//runFeedbackDef();
//can be used for open-ended/essay questions
//runFeedbackUndef();










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

//ID linked to score
var quizID;

//all info to display
var questionDisplay = document.getElementById("quDisplay");
var userAnswer = document.getElementById("userAnswer").value;
var ansNumber;
var ansExplain;

var markDisplay = document.getElementById("markDisplay")
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
var speedTimer = 0;
var speedPointsCount = 0;

//go to reuslts page with context for answer key
var ansSubject = subjectQ;
var ansIdent = identQ;
var ansName = nameQ;


//bool controls whether check or continue function is ran
var isContinue = false;
var isDone = false;



//answer key
var ansValue;

//mark award
var marksQ;
var marksTot = 0;

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
        quizID = data["quizID"]

        dataQA = data["questionList"]
        dataTotalQuestions = dataQA.length;
        dataQuizLength = Math.round(dataTotalQuestions/3);
        //console log validates data is loading correctly for debugging.

        i = Math.floor(Math.random() * (dataTotalQuestions-1));
        completedQuestions[n] = i;

        questionDisplay.textContent = dataQA[i]["qu"]
        markDisplay.textContent = "[" + dataQA[i]["marks"] + "]"
        ansValue = dataQA[i]["ans"]
        marksQ = dataQA[i]["marks"]
        solutionText.textContent = dataQA[i]["solution"]
        questionNumber.innerHTML = "Question " + (n+1) + " of " + (dataQuizLength);
        titleofQuiz.innerHTML = data["title"]
       } )





checkButton.addEventListener('click', checkAnswer);
continueButton.addEventListener('click', loadNextQuestion);
solutionExpand.addEventListener('click', explainAnswer)


setInterval(function() {speedTimer += 1;}, 1000);


function explainAnswer() {
    solutionText.textContent = runFeedbackDef(dataQA[i]["qu"],ansValueLC,userAnswerLC,marksQ);
}




function checkAnswer() {       

    checkButton.style.visibility = 'hidden';
    continueButton.style.visibility = 'visible';
    continueDiv.style.visibility = 'visible';
    solutionDiv.style.visibility = 'visible';
    clearInterval();


    userAnswer = document.getElementById("userAnswer").value;

    userAnswerLC = userAnswer.toLowerCase();
    ansValueLC = ansValue.toLowerCase();
    
    if (userAnswerLC == ansValueLC) {


        continueDiv.style.backgroundColor = '#d5ffd5';
        solutionDiv.style.backgroundColor = '#d5ffd5';
        feedbackText.style.color = '#348926';
        solutionExpand.style.color = '#348926';
        feedbackText.innerHTML = '&#10004; Great job!';
        continueButton.classList.remove('buttonStOr')
        continueButton.classList.add('buttonStGr')

        if (speedTimer < ((marksQ*60) * 2))
        {
            speedPointsCount +=3;
        }
        if (speedTimer < ((marksQ*60) * 1.5))
        {
            speedPointsCount +=3;
        }

        if (speedTimer < (marksQ*60))
        {
            speedPointsCount +=4;
        }
        corr = corr + marksQ;
        marksTot = marksTot + marksQ;

        
    }
    else {
        
        continueDiv.style.backgroundColor = '#ffeed0';
        solutionDiv.style.backgroundColor = '#ffeed0';
        feedbackText.style.color = '#8a5d16';
        solutionExpand.style.color = '#8a5d16';
        feedbackText.innerHTML = '&#33; Not quite.';
        continueButton.classList.remove('buttonStGr')
        continueButton.classList.add('buttonStOr')
        inco++;
        marksTot = marksTot + marksQ;
        
    }
}

function loadNextQuestion() {

    userAnswer.value = 0;
    //if question count is less than 7, load next question, otherwise go to results page with context
    if (n < (dataQuizLength-1)) {
    n++;

    questionNumber.innerHTML = "Question " + (n+1) + " of " + (dataQuizLength);
    randomQ();

    questionDisplay.textContent = dataQA[i]["qu"]
    ansValue = dataQA[i]["ans"];
    marksQ = dataQA[i]["marks"]
    markDisplay.textContent = "[" + dataQA[i]["marks"] + "]"
    solutionText.textContent = dataQA[i]["solution"]

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
                "?quizPercent=" + corrWrong + "&speedScore=" + speedPointsAvg + "&ansSubject=" + ansSubject + "&ansIdent=" + ansIdent + "&ansName=" + ansName + "&quizID=" + quizID;

            window.location.href = url;
        }

        redirectPage(Math.round((corr/marksTot)*100), Math.round(speedPointsCount/(dataQuizLength)*10) + "%", subjectQ, identQ, nameQ)
    }
    
}



//onclick of the button, change the id to continue button and change text to continue
//onclick of the continue button, change it back to check, add 1 to i, so loop repeats
