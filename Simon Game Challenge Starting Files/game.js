function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    playSound(randomChosenColor)
    animatePress(randomChosenColor)
    level++
    $("#level-title").html("Level " + level)

}


function checkAnswer(currentlevel) {
    if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = []
        }
    }
    else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart!")
        startOver()
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    hasGameStarted = false;
    userClickedPattern = []
}

var userClickedPattern = []
var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var hasGameStarted = false
var level = 0






//$("#" + randomChosenColor).fadeOut(100).fadeIn(100)





//var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
//audio.play();


$(".btn").on("click", function() {
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    playSound(this.id)
    animatePress(this.id)
    checkAnswer(userClickedPattern.length - 1)
})




$(document).on('click',function(e) {
    if (hasGameStarted === false) {
        $("h1").html("Level 1")
    }
    setTimeout(function(){
        if (hasGameStarted === false) {
            nextSequence()
            hasGameStarted = true
        }
    }, 1000);
})
