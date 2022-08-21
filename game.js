var started = false;
var lvl = 0;


buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + lvl);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  userClickedPattern.push($(this).attr("id"));
  animatePress($(this).attr("id"));
  playSound($(this).attr("id"));
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    $("#level-title").text("Game Over boi get yo loser ass out or press any key to continue");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    new Audio("wrong.mp3").play();
    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  lvl++;
  $("#level-title").text("Level " + lvl);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor){
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name){
  new Audio(name + ".mp3").play();
}

function startOver(){
  lvl = 0;
  gamePattern = [];
  started = false;
}
