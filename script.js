//Create Vars
var timerEl = document.querySelector("#time")
var questionsEl = document.querySelector("#questions")
var optionsEl = document.querySelector("#options")
var submitBtn = document.querySelector("#submit")
var initialBtn = document.querySelector("#initial")
var info = document.querySelector("#info")
var intitials = document.querySelector("#initials")

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function startQuiz() {
    var startScreenEl = document.getElementbyId("intitial-screen");
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

    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + "." + choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode);
    });

    }

    function questionClick() {

    if (this.value !== questions[currentQuestionIndex].answer) 
    time -= 15;
    }
    
    if (time < 0) {
        time = 0;

    }

