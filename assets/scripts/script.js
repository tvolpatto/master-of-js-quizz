
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
var playerResults = { initials: "PLR", score: 0, position: 5 };
var highscores = localStorage.getItem("highscores") != null
  ? JSON.parse(localStorage.getItem("highscores")) : [];


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
    if (countdown >= 0) {
      if (countdown < 10) {
        animate();
      }
      $("#timer").text(countdown--);
    } else {
      finishQuizz();
    }
  }, 1000);
}

function animate() {
  $("#timer").addClass("text-danger");
  $("#timer").animate({ "font-size": "2.5rem" });
  $("#timer").animate({ "font-size": "2rem" });
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
  if (index < numberOfQuestions) {
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
  $("#start").addClass("d-none");
  answerMsg.addClass("d-none");
  $(".form-inline").addClass("d-none");
  $("#end").addClass("d-none");
  $("#highscores").addClass("d-none");

}

function finishQuizz() {
  clearInterval(myTimer);
  divQuestion.addClass("d-none");
  clearScreen();
  checkHighScores();
  $("#score").text(score);
  $("#end").removeClass("d-none");
}

function addToHighScore() {
  playerResults.initials = $("#initials").val() != "" ? $("#initials").val() : "PLR";
  playerResults.score = score;
  var idx = playerResults.position;
  if (idx < 5) {
    var aux = { position: 5 };
    if (idx < highscores.length) {
      aux = highscores[idx];
      aux.position++;
    }
    highscores[idx] = playerResults;
    playerResults = aux;
    addToHighScore();
  }
  localStorage.setItem("highscores", JSON.stringify(highscores));
  playerResults = { initials: "PLR", score: 0, position: 5 };
  displayHighscores();
}

function checkHighScores() {
  var position = highscores.length;
  if (position < 5) {
    playerResults.position = position;

  } else {
    for (var i = position - 1; i >= 0; i--) {
      if (playerResults.score > highscores[i].score) {
        playerResults.position = i;
      } else {
        break;
      }
    }
  }
  if (playerResults.position < 5) {
    $(".form-inline").removeClass("d-none");
  }

}

function displayHighscores() {
  clearScreen();
  $("#highscores").removeClass("d-none");
  var ul = $(".list-group");
  highscores.forEach(hs => {
    var li = $(`<li class="list-group-item d-flex justify-content-between align-items-center">
                ${hs.initials}
                <span>${hs.score}</span>
              </li>`);
    ul.append(li);
  });  
}

function back() {
  clearScreen();
  $("#start").removeClass("d-none");

}
