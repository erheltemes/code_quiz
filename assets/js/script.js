var startBtn = document.querySelector("#start-button")
var timeEl = document.querySelector(".timer h2")
var startBox = document.querySelector(".start-box")
var questionBox = document.querySelector(".question-box")
var finalScoreBox = document.querySelector(".final-score-box")
var initialsInput = document.querySelector("#intials-input")
var highscoreCard = document.querySelector(".highscores")
var highscoreBtn = document.querySelector(".highscore-button button")

var questionBoxTitle = document.querySelector(".question-box h2")
var questionBoxAnswers = document.querySelectorAll(".question-box span")
var questionBtns = document.querySelectorAll(".question-box button")

var timeLeft = 75
var stopTimer = false

var questions = []
var chosenQuestion = []
var questionBtnValue 

function displayHighscores() {
    var highscoreList = JSON.parse(localStorage.getItem("highscore"))
    // var highscoreArray = highscoreList.split(",")

    console.log(highscoreList)
    for (i = 0; i < highscoreList.player.length; i++) {
        highscoreCard.innerHTML = `<p> Name: ${highscoreList.player[i]} &nbsp; &nbsp; Score: ${highscoreList.score[i]} </p>`
    } 
}

function highscoreSubmission(event) { 
    if (event.key === "Enter") {

        var highscore = {
            player: initialsInput.value,
            score: timeLeft,
        }
        localStorage.setItem("highscore", JSON.stringify(highscore))

        finalScoreBox.setAttribute("style", "display: none;")
        startBox.setAttribute("style", "display: block;")
        timeLeft = 75
        timeEl.textContent = "Time: " + timeLeft;
    }
}

function recordFinalScore() {
    finalScoreBox.setAttribute("style", "display: block;")
    stopTimer = true
    document.addEventListener("keypress", highscoreSubmission)
}

function answerVerdict(event) {
    console.log(event.target.innerHTML)
    console.log("<button>" + chosenQuestion[5] + "</button>")
    if (event.target.innerHTML == chosenQuestion[5]) {
        chooseQuestion()
    }
    else {
        timeLeft = (timeLeft - 10)
        chooseQuestion()
    }
}

function chooseQuestion() {
    if (questions.length === 0) {
        questionBox.setAttribute("style", "display: none;") 
        recordFinalScore()
    }

    else {
        questionBox.setAttribute("style", "display: block;")
        var randNum = (Math.floor(Math.random() * (questions.length / 6)) * 6);
        chosenQuestion = questions.splice(randNum, 6)
    }

    //displays chosen question
    questionBoxTitle.textContent = chosenQuestion[0]  
    for (i = 1; i < 5; i++) {
        questionBoxAnswers[i-1].textContent = chosenQuestion[i]
    }

    //determines if answer is correct  
    questionBtns[0].addEventListener("click", answerVerdict);
    questionBtns[1].addEventListener("click", answerVerdict);
    questionBtns[2].addEventListener("click", answerVerdict);
    questionBtns[3].addEventListener("click", answerVerdict);  
}
function resetQuestions() {
    questions = [
    //give value of 1 - 4 to denote correct answer
    "What is the best font?", "Comic Sans", "Monospace", "Cursive", "Papyrus", "Answer 1",
    "How does Gary Almes feel about Comic Sans", "Hates it", "Loves it", "Thinks it has specific use cases", "meh", "Answer 2",
    "When should one use the comic sans font?", "Never", "Rarely", "Sometimes", "Always", "Answer 4",
    "Do we deserve comic sans?", "Of course", "Why not?", "Some of us do...", "Comic sans is a gift from the gods.", "Answer 4",
    ]
}

function timer() {
    timeLeft = 75
    var timerInterval = setInterval(function() {
        timeLeft = (timeLeft - 1)
        timeEl.textContent = "Time: " + timeLeft;
        if (stopTimer === true) {
            clearInterval(timerInterval)
        }

        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            recordFinalScore()
        }
    }, 1000);
}

function quizStart() {
    stopTimer = false
    timer()
    startBox.setAttribute("style", "display: none;")
    resetQuestions()
    chooseQuestion()




}


//loop random question that has not been opened before

//record final score


highscoreBtn.addEventListener("click", displayHighscores)

startBtn.addEventListener("click", quizStart);