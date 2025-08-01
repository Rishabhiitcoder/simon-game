var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
var userClickedPattern = [];
$(document).keypress(function(){
  if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
  }
})
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200); 
    $("#level-title").text("Game Over, Press Any Key to Restart"); 
    startOver() ; 
  }

}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name){
    var chosenColorSound = new Audio( name + ".mp3");
    chosenColorSound.play();

}

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function()  {
    $("#"+ currentColour).removeClass("pressed");
  },100);


}
function startOver(){
  level = 0;
  gamePattern = [];
  started= false ;
}