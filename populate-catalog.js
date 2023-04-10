var jsScript = $('script[src*=poulate-catalog]');
var linkPassthrough = jsScript.attr('link');

var STlength = 0;
var CAlength = 0;

var subtopicPage = [];

var div = [];


fetch(linkPassthrough + "/catalog.json")
    .then(response => response.json())
    .then(data => {
        title = data["unitName"];

        var titlePage = document.createElement('h1');
        titlePage.textContent = title;
        titlePage.className ="titleText";


        dataST = data["subtopics"];
        
        STlength = JsonGetArrayLength(dataST);
        for (i=0; i<STlength; i++) {
        
        sectionTitle[i] = dataST[i]["title"]
        subtopicPage[i] = document.createElement('h2');
        subtopicPage[i].textContent = title;
        subtopicPage[i].className = "bodySm";


        dataCA = dataST[i]["cards"]

        CAlength = JsonGetArrayLength(dataCA);
            for (j=0; j<CAlength; j++) {
            
                
            }


        }

        

        //console log validates data is loading correctly for debugging.
        console.log(data)
        console.log(data.quizID)









 
        completedQuestions[n] = i;
        console.log("Questionbank: " + completedQuestions[n]);
        questionDisplay.textContent = dataQA[i]["qu"]
        o1.innerHTML = dataQA[i]["a1"] + '<input type="radio" name="radio" value="1"><span class="checkmark"></span>'
        o2.innerHTML = dataQA[i]["a2"] + '<input type="radio" name="radio" value="2"><span class="checkmark"></span>'
        o3.innerHTML = dataQA[i]["a3"] + '<input type="radio" name="radio" value="3"><span class="checkmark"></span>'
        o4.innerHTML = dataQA[i]["a4"] + '<input type="radio" name="radio" value="4"><span class="checkmark"></span>'
        ansValue = dataQA[i]["ans"]
        marksQ = dataQA[i]["marks"]
        speedUpper = dataQA[i]["timeUpper"]
        solutionText.textContent = dataQA[i]["solution"]
        questionNumber.innerHTML = "Question " + (n+1) + " of " + (dataQuizLength);
        titleofQuiz.innerHTML = data["title"]
        console.log("Speed Upper Req:" + speedUpper)






       } )

