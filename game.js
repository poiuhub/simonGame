var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

//------------------------------ Start game
$(".startbtn").click(function() {
    if (started == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


//------------------------------Random Number
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//------------------------------User Clicked Answer
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});




//------------------------------ AudioPlay
function  playSound(name) {
    var audio = new Audio("sounds/" + name +".mp3"); 
    audio.play();
}

//------------------------------ Animation Effect for btn
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 50);
}


//------------------------------ Check Answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press the Start Button to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over"); 
        }, 200);
        startOver();
    }
}


//------------------------------ Restart the Game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}