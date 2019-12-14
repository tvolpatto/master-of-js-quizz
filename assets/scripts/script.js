
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
  },
  {
    title: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseclick", "onmouseover", "onclick", "onchange"],
    answer: "onclick"
  },
  {
    title: `How do you write "Hello World" in an alert box?`,
    choices: [`alertBox("Hello World");`, `alert("Hello World");`, `msg("Hello World");`, `msgBox("Hello World");`],
    answer: `alert("Hello World");`
  },
  {
    title: "How to write an IF statement in JavaScript?",
    choices: ["if i == 5 then", "if i = 5", "if i = 5 then","if (i == 5)"],
    answer: "if (i == 5)"
  },
  {
    title: "How do you round the number 7.25, to the nearest integer?",
    choices: ["ceil(x, y)", "top(x, y)", "Math.ceil(x, y)", "Math.max(x, y)"],
    answer: "Math.max(x, y)"
  }

];

var divQuestion = $("#questions");
var answerMsg = $("#answer-msg");
var index = 0;
var score = 0;
var countdown = 0;
var numberOfQuestions = 0;
var myTimer;
var playerResults = {};
var highscores = [];

$(document).ready(function () {
  initVariables();
});

function displayQuestion() {
  var question = questions[index];
  var questionTitle = $("<h4>");
  questionTitle.addClass("mb-3");
  questionTitle.text(question.title);
  divQuestion.append(questionTitle);

  question.choices.forEach(choice => {
    var divChoice = $("<div>");
    divChoice.addClass("choice border border-info rounded p-1 mt-1 w-50");
    divChoice.attr("data-index", index);
    divChoice.append(`<span class="m-2 ">${choice}</span>`);
    divChoice.click(choiceClick);
    divQuestion.append(divChoice);
  });

  divQuestion.removeClass("d-none");
}

function startQuiz() {
  initVariables();
  $("#timer").text(countdown);
  displayQuestion();
  $("#start").addClass("d-none");

  myTimer = setInterval(function () {
    if (countdown >= 0) {
      if (countdown < 10) {
        animateTimer();
      }
      $("#timer").text(countdown--);
    } else {
      finishQuizz();
    }
  }, 1000);
}

function initVariables() {
  index = 0;
  numberOfQuestions = questions.length;
  countdown = 15 * numberOfQuestions;
  playerResults = { initials: "PLR", score: 0, position: 5 };
  highscores = localStorage.getItem("highscores") != null
    ? JSON.parse(localStorage.getItem("highscores")) : [];
}

function animateTimer() {
  $("#timer").addClass("text-danger");
  $("#timer").animate({ "font-size": "2.5rem" });
  $("#timer").animate({ "font-size": "2rem" });
}

function choiceClick() {
  var idx = parseInt($(this).attr("data-index"));
  var userAnswer = $(this).text();

  if (questions[idx].answer === userAnswer) {
    displayAnswerMsg($(this), "correct", "Correct!");
    updateScore();
  } else {
    updateTimer()
    displayAnswerMsg($(this), "wrong", "Wrong!");
  }

  index = idx + 1;
  if (index < numberOfQuestions) {
    setTimeout(() => {
      clearScreen();
      displayQuestion();
    }, 500);
  } else {
    finishQuizz();
  }
}

function updateTimer() {
  countdown -= 9;
  animateTimer();
  setTimeout(() => {
    $("#timer").removeClass("text-danger");
  }, 400);
}

function updateScore() {
  score++;
  $("#score").addClass("text-success");
  $("#score").text(score);
  setTimeout(() => {
    $("#score").removeClass("text-success");
  }, 400);

}

function displayAnswerMsg(elm, clazz, text) {
  elm.addClass(`${clazz} d-flex justify-content-between`);
  elm.append(`<span class="m-2">${text}</span>`);
}

function clearScreen() {
  divQuestion.empty();
  $("#start").addClass("d-none");
  answerMsg.addClass("d-none");
  $(".form-inline").addClass("d-none");
  $("#end").addClass("d-none");
  $("#highscores").addClass("d-none");
  $(".hs-item").remove();
  $(".score").removeClass("d-none");

}

function finishQuizz() {
  clearInterval(myTimer);
  divQuestion.addClass("d-none");
  clearScreen();
  checkHighScores();
  $("#final-score").text(score);
  $(".score").addClass("d-none");
  $("#end").removeClass("d-none");
}

function addToHighScore() {
  
  playerResults.initials = $("#initials").val() != "" ? $("#initials").val() : "PLR";
  playerResults.score = score;
  
  var idx = playerResults.position;
  $.each(highscores, (i, hs) => {
    if(hs.score < playerResults.score) {
      playerResults.position = i+1;
      highscores[i] = playerResults;
      playerResults = hs;
    }    
  });
  if (idx < 5  && highscores.length < 5) {
     playerResults.position++;
    highscores.push(playerResults);
  }

  localStorage.setItem("highscores", JSON.stringify(highscores));
  
}

function checkHighScores() {
  if (score > 0) {
    var position = highscores.length;
    playerResults.position = position;

    for (var i = position - 1; i >= 0; i--) {
      if (score > highscores[i].score) {
        playerResults.position = i;
      } else {
        break;
      }
    }
  }
  if (playerResults.position < 5 && score > 0) {
    $("#final-msg").text("Congratulations!");
    $(".hs-update").removeClass("d-none");
  } else {
    $(".hs-update").addClass("d-none");
    $("#final-msg").text("Game Over!");
  }

}

function displayHighscores() {
  clearScreen();
  $("#highscores").removeClass("d-none");
  var ul = $(".list-group");
  highscores.forEach(hs => {
    var li = $(`<li class="hs-item list-group-item d-flex justify-content-between align-items-center">
                ${hs.initials}
                <span>${hs.score}</span>
              </li>`);
    ul.append(li);
  });
  if (highscores.length > 0) {
    $(".trophy").addClass("d-none");
  }
}

function back() {
  clearScreen();
  $("#start").removeClass("d-none");
}
