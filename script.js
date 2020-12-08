var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red','blue','green','yellow'];
var level = 1;

function nextSequence()
{
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChoosenColor = buttonColors[randomNumber];
    randomColorId = "#" + randomChoosenColor;
    $(randomColorId).delay(80).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var randomAudio = "E:/SimonGame/sounds/" + randomChoosenColor + ".mp3"
    var audio = new Audio(randomAudio);
    audio.play();
    gamePattern.push(randomChoosenColor);
    console.log("game-pattern " + gamePattern);
}
///Color Blinker on screen



function animatePress(bttn)
{
    var e = "#" + bttn;
    $(e).addClass("pressed");
    setTimeout(function() {
    $(e).removeClass("pressed");
    }, 75);
}

///GAME Pattern 
//console.log(gamePattern);


///when any button is pressed
$(".btn").click(function(event){
    console.log("button is pressed");
    animatePress(event.target.id);
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    var randomAudio = "E:/SimonGame/sounds/" + userChosenColor + ".mp3"
    var audio = new Audio(randomAudio);
    audio.play();
    if(checkAnswer())
    //$("#level-title").html("Level : "+level)
    {
        setTimeout(function(){
            $("#level-title").html("Level : " + level);
        },1000);
        console.log("After check up : level is " + level);
        setTimeout(function(){
            nextSequence();
        },1000);
    }
});

///First Key Press
var First = 1;
$("body").keydown(function(){
    if(First == 1)
    {
        nextSequence(level);
        $("#level-title").html("Level : 1")
        First += 1;
    }
});
///check answer
function checkAnswer()
{
    var count =0;
    for(var i = 0 ; i < gamePattern.length ; i++)
    {
        if(gamePattern[i] === userClickedPattern[i])
        {
            count = count+1;
        }
    }
    if(count == gamePattern.length)
    {
        setTimeout(function(){
            $("#level-title").html("success");
        },1000);
        userClickedPattern = [];
        level += 1;
        return true;
    }
    else if((userClickedPattern.length >= gamePattern.length && count != gamePattern.length) || count == 0)
    {
        $("#level-title").html("Failed,press any key to play again.");
        $("body").addClass("game-over");
        First = 1;
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);   
        return false;
    }
    else
    {
        $("#level-title").html("Continue...Tapping");
        return false;
    }
}