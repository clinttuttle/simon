var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var levelNumber = 0;

$(document).keypress(function(event) {
  if (gameStarted === false) {
    $("#level-title").text("Level " + levelNumber);
    nextSequence();
    gameStarted = true;
  }
});

$("h1").click(function(event) {
  if (gameStarted === false) {
    $("#level-title").text("Level " + levelNumber);
    nextSequence();
    gameStarted = true;
  }
});


$(".btn").click(function(event) {
 if (gameStarted === true) {
   var userChosenColor = event.currentTarget.id;
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length - 1);
 }

});
//solution version of part 4 in challenge
// $(".btn").click(function() {
//   var userChosenColor = $(this).attr("id");
//   userClickedPattern.push(userChosenColor);
// });

function checkAnswer(currentLevel) {
  console.log("user clicks:" + userClickedPattern);
  console.log("user index:" + userClickedPattern.length);
  console.log("game pattern:" + gamePattern);
  console.log("level number: " + levelNumber);

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    playSound("wrong");
  }
}

function nextSequence() {

  levelNumber++;
  $("#level-title").text("Level " + levelNumber);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  var colorDiv = "#" + randomChosenColor;
  $(colorDiv).fadeOut(25).fadeIn(25);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  userClickedPattern = [];
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gameStarted = false;
  levelNumber = 0;
  gamePattern = [];
  $(".btn").attr("disabled", true);
}
