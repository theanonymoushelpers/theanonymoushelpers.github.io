
function getQuizParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName)
}

var subjectQ = getQuizParameter('subject')
var identQ = getQuizParameter('ident')
var nameQ = getQuizParameter('quizName')

var directQ = subjectQ + "/" + identQ + "/" + nameQ + ".json"


document.write(directQ);
