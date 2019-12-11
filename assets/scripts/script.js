var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    }
];
var divQuestion = $("#questions");
var index = 0;
var numberOfQuestions = questions.length;
var timer = 15 * numberOfQuestions;

function displayQuestion(index) {

    var question = questions[index];
    var divTitle = $("<div>");
    divTitle.text(question.title);
    divQuestion.append(divTitle);
    question.choices.forEach(choice => {
        var divChoice = $("<div>");
        divChoice.addClass(".choice");
        divChoice.attr("data-index", index);
        divChoice.text(choice);
        divChoice.click(choiceClick);
        divQuestion.append(divChoice);
    });

}

function startQuiz() {

    $("#timer").text(timer);
    displayQuestion(index);
    $("#start").addClass("d-none");
    setInterval(function () {
        if (timer >= 0) {
            $("#timer").text(timer--);
        } else {
            clearInterval();
        }
    }, 1000);
}


function choiceClick() {
    var idx = $(this).attr("data-index");
    var userAnswer = $(this).text();
    if (questions[idx].answer === userAnswer) {
        alert("correct");
    } else {
        alert("wrong");
    }
    index = parseInt(idx) + 1;

    divQuestion.empty();
    if (index < numberOfQuestions) {
        displayQuestion(index);
    }
}

