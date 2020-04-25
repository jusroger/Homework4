var questions = [
    {
        title: "What programing language allows you to edit the appearenace of your Webpage?",
        choices: ["Javascript", "HTML", "CSS", "Paint"],
        answer: "CSS"
    },
    {
        title: "Which programing language provides the base structure of a Webpage?",
        choices: ["CSS", "HTML", "Javascript", "http"],
        answer: "HTML"
    },
    {
        title: "Which programing language is used to add functionality and interactivity to a Webpage?",
        choices: ["Javascript", "bootstrap", "HTML", "Windows"],
        answer: "Javascript"
    },
    {
        title: "What Javascript code allows you to make an interactive Webpage?",
        choices: ["var", "getElementById", "function()", "Class."],
        answer: "function()"
    },
    {
        title: "How many times have you cried during the UM Coding Bootcamp?",
        choices: ["Once", "Weekly", "Monthly", "All the time"],
        answer: "All the time"
    },

];
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 90;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0) {
            clearInterval(holdInterval);
            allDone();
            currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
    if (element.textContent == questions[questionIndex].answer) {
        score++;
        createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
    } 
    else {
        secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
}
    
questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);
var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createP2);
}

var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);
var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);
var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

createSubmit.addEventListener("click", function () {
    var initials = createInput.value;
    if (initials === null) {
        console.log("No value entered!");
    } else {
        var finalScore = {
        initials: initials,
        score: timeRemaining
    }
    console.log(finalScore);
    var allScores = localStorage.getItem("allScores");
    if (allScores === null) {
        allScores = [];
    } else {
        allScores = JSON.parse(allScores);
    }
    allScores.push(finalScore);
    var newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    window.location.replace("./Scores.html");
    }
});
}