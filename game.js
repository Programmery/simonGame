$(document).ready(function() {
  var gamePattern = [];
  var playerPattern = [];
  var chosenColor;


  //Begin game
  $(document).keypress(function() {
    if (gamePattern == 0) {
      randomColorButton();
    } else {
      console.log("...game in progress...");
    }
  });

  //System color choice and pattern formation
  function randomColorButton() {
    var colorArray = ["green", "red", "yellow", "blue"];
    var randomNumber = ((Math.floor(Math.random() * 4)));
    chosenColor = colorArray[randomNumber];
    soundPlay(chosenColor);
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    gameInProgress();
  }

  //Player's button press
  $(".btn").click(function(event) {
    if (gamePattern == 0) {
      console.log("The game has not started yet!");
    } else {
      var userColor = event.target.id;
      playerPattern.push(userColor);
      $(event.target).addClass("pressed");
      setTimeout(function() {
        $(event.target).removeClass("pressed");
      }, 100);
      winOrLoose(userColor);
    }
  });

  //Gameresults and outcomes
  function winOrLoose(userColor) {
    if (gamePattern.length !== playerPattern.length && playerPattern[playerPattern.length - 1] == gamePattern[playerPattern.length - 1]) {
      soundPlay(userColor);
    } else if (gamePattern.length == playerPattern.length && gamePattern[gamePattern.length - 1] == playerPattern[playerPattern.length - 1]) {
      soundPlay(userColor);
      var beforeTimeout = playerPattern.length; //before timeout
      setTimeout(function() {
        if (beforeTimeout == playerPattern.length) { //check if anything was pressed during timeout
          playerPattern = [];
          randomColorButton();
        }
      }, 600);

    } else {
      console.log("WRONG!");
      gameOverBoi();
    }
  }

  //Button sounds
  function soundPlay(chosenColor) {
    switch (chosenColor) {
      case "green":
        var greenSound = new Audio("sounds/green.mp3");
        greenSound.play();
        break;
      case "red":
        var redSound = new Audio("sounds/red.mp3");
        redSound.play();
        break;
      case "yellow":
        var yellowSound = new Audio("sounds/yellow.mp3");
        yellowSound.play();
        break;
      case "blue":
        var blueSound = new Audio("sounds/blue.mp3");
        blueSound.play();
        break;
    }
  }

  function gameInProgress() {
    $("#level-number").html("Level " + gamePattern.length);
    $("#starting-title").addClass("hidden");
    $("#game-restart").addClass("hidden");
    $("#level-number").removeClass("hidden");
  }

  function gameOverBoi() {
    var wrongChoice = new Audio("sounds/wrong.mp3");
    wrongChoice.play();
    gamePattern = [];
    playerPattern = [];
    $("#starting-title").addClass("hidden");
    $("#level-number").addClass("hidden");
    $("#game-restart").removeClass("hidden");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }


});
