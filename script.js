//Create Vars
var timerEl = document.querySelector("#time") 
var questionsEl = document.querySelector("#questions")
var choicesEl = document.querySelector("#choices") 
var submitBtn = document.querySelector("#submit")
var startBtn = document.querySelector("#start")
var initialsEl = document.querySelector("#intials")
var feedbackEl = document.querySelector("#feedback")

var currentQuestionIndex = 0;
var time = questions.length * 13;
var timerId;

function startQuiz() {
    var startScreenEl = document.getElementbyId("start-screen");
    startScreenE1.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clock, 1000);

    timerEl.textContent = time;

    getQuestion();

}

function getQuestion() {

    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.options.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + "." + choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode);
    });

}

function questionClick() {

    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 5;
    }

    if (time < 0) {
        time = 0;

    }


    // Edited Time : NEW
    timerEl.textContent = time;
    feedbackEl.textContent = "Incorrect, Good Try!";
    feedbackEl.style.color = "orange";
    feedbackEl.style.fontSize = 400 % ;

} else {

    feedbackEl.textContent = "Correct, Nice Work!";
    feedbackE1.style.color = "blue";
    feedbackEl.style.fontSize = "400%";

}

feedbackEl.setAttribute("class", "feedback") ;
setTimeout(function() {
feedbackEl.setAttribute("class", "feedback hide");
}, 1000);






