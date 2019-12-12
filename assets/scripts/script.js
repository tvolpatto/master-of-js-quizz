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
var answerMsg = $("#answer-msg");
var index = 0;
var score = 0;
var numberOfQuestions = questions.length;
var countdown = 15 * numberOfQuestions;
var myTimer;


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
  
  $("#timer").text(countdown);
  displayQuestion(index);
  $("#start").addClass("d-none");
  myTimer = setInterval(function () {
    if (countdown > 0) {
      $("#timer").text(countdown--);
    } else {
      finishQuizz();
    } 
  }, 1000);
}


function choiceClick() {
  var idx = parseInt($(this).attr("data-index"));
  var userAnswer = $(this).text();
  
  if (questions[idx].answer === userAnswer) {
    displayAnswerMsg("text-success", "Correct!");
    score++;
  } else {
    countdown -= 9;
    displayAnswerMsg("text-danger", "Wrong!");
  }
  
  index = idx + 1;
  if (index < numberOfQuestions ) {
    setTimeout(() => {
      clearScreen();
      displayQuestion(index);
    }, 500);
  } else {
    finishQuizz();
  }
}

function displayAnswerMsg(clazz, text) {
  answerMsg.removeClass("d-none text-success text-danger").addClass(clazz);
  answerMsg.text(text);
}

function clearScreen() {
  divQuestion.empty();
  answerMsg.addClass("d-none");
}

function finishQuizz(){
  clearInterval(myTimer);
  clearScreen();
  divQuestion.addClass("d-none");
  $("#end").removeClass("d-none");
}

