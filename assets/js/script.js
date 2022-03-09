function log(log) {
    return console.log(log);
}

// Query Selectors
const startPage = document.querySelector("#start-page");
const quiz = document.querySelector("#quiz");
const ansResultMsg = document.querySelector("#ans-result-msg");
const initials = document.querySelector("#initials");
const question = document.querySelector("#qH2");
const startBtn = document.querySelector("#startBtn");
const initialInput = document.querySelector("#initial-input");
const timeEl = document.querySelector("#time");

// Variables.
let qIdx = 0;
let score = 0;
let secondsLeft = 100;
let timerInterval = 0;

// Constants
const ansLen = questions[qIdx].answers.length;
const sectionToDisplay = [startPage, quiz, ansResultMsg, initials];

fillQnA(qIdx);

// Starts the quiz when the start quiz button is pressed.
function startQuiz() {
    renderHighScores()
    fillQnA(qIdx);
    startPage.dataset.visible = "false";
    quiz.dataset.visible = "true";
    startBtn.addEventListener("click", toDisplay());
    timer();
}

// Will save quiz when window or tab is closed
window.addEventListener("unload", function (event) {
    //save local data
})

function checkAns(clicked_id) {
    document.getElementById("ans-result-msg").style.opacity = "100"
    ansResultMsg.dataset.visible = "false";
    const qLen = questions.length;
    if (qIdx < qLen - 1) {
        // Validating the answers. 
        if (clicked_id == questions[qIdx].answer) {
            ansResultMsg.textContent = "The answer is CORRECT";
            score = score + 10;
        }
        else {
            ansResultMsg.textContent = "The answer is WRONG";
            secondsLeft = secondsLeft - 20;
        }
        ansResultMsg.dataset.visible = "true";
        setTimeout(fadeoutMsg, 500);
        // increment the questions index
        qIdx++;
        fillQnA(qIdx);
    }
    else if (qIdx === qLen - 1) {
        log("time to input initials and show the results");
        clearInterval(timerInterval);
        // Hide answers section and show initials section.            
        quiz.dataset.visible = "false";
        initials.dataset.visible = "true";
        toDisplay();
    }
    else {
        log("there has been an error");
    }
}



function timer() {
    timerInterval = setInterval(function () {
        log("i am here");
        secondsLeft--;
        timeEl.innerHTML = " - " + secondsLeft + " seconds left";

        log("qIdx: " + qIdx + " - questions len: " + questions.length);
        if (qIdx === (questions.length)) {
            window.alert("Clearing interval");
            clearInterval(timerInterval);
        }
        if (secondsLeft === 0 || secondsLeft < 0) {
            // Stops execution of action at set interval.
            clearInterval(timerInterval);
            // Hide answers section and show initials section.            
            quiz.dataset.visible = "false";
            initials.dataset.visible = "true";
            //saveHighScores();
            toDisplay();
        }
    }, 1000);
}

function saveHighScores() {
    let highScores = {
        games: []
    }

    let highScoresParsed = JSON.parse(localStorage.getItem("highScores"));

    if (highScoresParsed != null) {
        alert("games array is not empty... push and assign highscoresArr = highScoresParsed")
        highScoresParsed.games.push(game);
        highScores = highScoresParsed;
    }
    else {
        alert("games array is empty... push highScore")
        highScores.games.push(game);
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function renderHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores != null) {
        log("highScores lenght: " + highScores.games.length);
    }
}

function fillQnA(qIdx) {
    toDisplay();
    question.textContent = questions[qIdx].question;
    for (i = 0; i < ansLen; i++) {
        document.getElementById(i + 1).textContent = questions[qIdx].answers[i];
    }
}

function toDisplay() {
    for (i = 0; i < sectionToDisplay.length; i++) {
        if (sectionToDisplay[i].dataset.visible === "false") {
            sectionToDisplay[i].style.display = "none";
        } else {
            sectionToDisplay[i].style.display = "block";
        }
    }
}

function fadeoutMsg() {
    document.getElementById("ans-result-msg").style.opacity = "0";
}