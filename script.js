//Create var = document.querySlector. DOM elements=Document Object Model, programming interface that allows us to create, change, or remove elements from the document. can add events. 
var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

//variables for quiz
var currentQuestionIndex = 0;
var time = questions.length * 13;
var timerId;

//Beginning the quiz! function. The start screen should be hidden.
function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    //Have questions reappear 
    questionsEl.removeAttribute("class");

    //Functional timer: Begin clock
    timerId = setInterval(clockTick, 1000);

    //Start time appears on webpage
    timerEl.textContent = time;

    getQuestion();

}

//Question fxn. have question object from the array
//"refresh" for title for the question
//omit unused question options
//looping over the options
//make a new button for each option (for question)
//have event listener for each choice
//webpage: display on page
//choiceNode = node representing data instance of choice. 
// & instance of one of possible alternatives, only one is allowed to exist at one time in particular context of parent mode.
// & constructs a new non-gap choice node (collection, integer, content, origin), (string name, boolean open/removed, collection, integer, origin) constructs a new gap choice node
// & used to choose between one of many inputs. selector attribute's value is an integer that specifies index which input multi-attributes passed on to the input.

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

    //user is wrong? time penalty of timer
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 5;
    }

    if (time < 0) {
        time = 0;
    }


    // Edited Time : updated time on webpage
    timerEl.textContent = time;
    feedbackEl.textContent = "Incorrect, Nice Try!";
    feedbackEl.style.color = "orange";
    feedbackEl.style.fontSize = "400%";

    feedbackEl.textContent = "Correct, Nice Work!";
    feedbackEl.style.color = "blue";
    feedbackEl.style.fontSize = "400%";
}

//feedback given for incorrect or correct
feedbackEl.setAttribute("class", "feedback");
setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
}, 1000);

// for the next question
currentQuestionIndex++;

//checking the timer
if (currentQuestionIndex === questions.length) {
    quizEnd();
} else {
    getQuestion();
}

//Timer :Stop
function quizEnd() {
    clearInterval(timerId);

    //Show End Screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    //Final Score! end result
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    //questions: hidden
    questionsEl.setAttribute("class", "hide");

}

//update time and check if time is 0
function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

//input box: get value
//get saved quiz results from localStorage
//formatting new score object
//save to localStorage
//on to the next page
function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "score.html";

    }
}


function checkForEnter(event) {

    if (event.key === "Enter") {
        saveHighscore();
    }
}

// Entering your Initials
submitBtn.onclick = saveHighscore;

// Beginning the Quiz
startBtn.onclick = startQuiz;

//onkeyup: keyboard event that occurs when user leaves the keyboard key which was earlier pressed by user, releases key on keyboard.
initialsEl.onkeyup = checkForEnter;