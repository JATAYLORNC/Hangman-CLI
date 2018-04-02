// dependency for inquirer npm package
var inquirer = require("inquirer");

//dependency for is-letter npm package
var isLetter = require('is-letter');

//dependency for Letter constructor
var Letter = require("./letter.js");

//dependency for Word constructor
var Word = require("./word.js");

//variable to hold game letter objects
var gameLetterArray;

//variable to hold word object
var word;

//variable to hold split game word
var wordArray = [];

//variable to keep track of the number of guesses made
var guessCount;

//variable to hold initially selected game word
var gameWord;

//variable to hold array of letters previously guessed
var previousGuess;

//variable to keep track of the number of games played
var gameCount = 0;

//variable to keep track of the number of games won
var wins = 0;

//variable to keep track of the number of games lost
var losses = 0;

//call function to start a new game of hangman
newGame();

//function to start a new game
function newGame() {

  //reset gameLetter Array
  gameLetterArray = [];

  //reset previous guess array
  previousGuess = [];

  //select game word
  gameWord = selectGameWord();

  //construct letter objects for game word and push to gameLetterArray
  gameLetterArray = constructLetterObjects(gameWord);

  //construct word object for gameWord
  word = new Word(gameLetterArray);

  //reset guess count
  guessCount = 0;

  //message to CLI to indicate start of game to user
  console.log("Lets play hangman!" + "\n");

  //call function to display the displayLetters
  displayWord();

  //call function to prompt user to input a letter
  guessPrompt();

}

//function to select a game word
function selectGameWord () {

  //check to make sure there are still letters left in the word array
  if(wordArray.length === 0) {

    //define word array
    wordArray = ["Lake Lure", "Grandfather Mountain", "Blue Ridge Parkway", "Nags Head", 
                "Cape Hatteras", "Chimney Rock", "Kitty Hawk", "Emerald Isle", "Smoky Mountains"];

  }

  //Select game word
  var gameWordIndex = Math.floor(Math.random() * wordArray.length);
  var newGameWord = wordArray[gameWordIndex];

  //remove word from wordArray so that it cannot be selected again for new games played
  //during the same session
  wordArray.splice(gameWordIndex, 1);

  //return new game word
  return newGameWord;
}

//function to construct array of letter objects for gameWord
function constructLetterObjects(newWord) {

  //loop through each letter of the game word
  for(i=0; i<newWord.length; i++) {

    //variable to capture game letter at location index i
    var gameLetter = newWord.charAt(i);

    //construct letter object for game letter
    var letterObject = new Letter(gameLetter);

    //check to see if the letter is actually a space
    if(letterObject.letter === " ") {

      //change display from blank to space
      letterObject.changeDisplay();
    }

    //push the letter object to the game letter array
    gameLetterArray.push(letterObject);
  }

  //return the game letter array
  return gameLetterArray;
}

//function to display the game word
function displayWord() {

  //loop through each letter in the word object game letter array
  for(i=0; i<word.word.length; i++) {

    //display the displayletter to the CLI
    word.word[i].printLetter();  
  }

  //display the letters previously guessed
  console.log("\n\n" + "Previous Guesses: " + previousGuess + "\n");
}

//function to prompt the user to make a guess
function guessPrompt() {

  //check to see if the number of guesses reached the 10 guess limit
  if(guessCount < 10) {

    //display the number of guesses already made by the user
    console.log("Guess Count: " + guessCount + "\n\n");

    //invoke the npm inquirer prompt
    inquirer.prompt([
      //input object to prompt user to enter a letter
      {
        type: "input",
        name: "guess",
        message: "Enter a letter: "
      }
    ]).then(function(answer) {

      //variable to hold user guess
      var guess = answer.guess.toLowerCase();
      
      //check if input character is a letter
      if(isLetter(guess) === true) {

        //check if letter has previously been guessed
        if(previousGuess.indexOf(guess) >= 0) {

          //message to CLI to indicate letter has already been guessed
          console.log("This letter has already been guessed.  Please choose another letter." + "\n");

          //re-display game display letters and previous guesses
          displayWord();

          //call function to prompt user for another guess
          guessPrompt();

        //if letter has not been guessed
        }  else {

          //push guessed letter to previous guess array
          previousGuess.push(guess);
      
          //call verifyGuess method of word object
          word.verifyGuess(guess);

          //check if isInWord boolean has been set to true
          if(word.isInWord === true) {

            //reset isInWord boolean to false
            word.isInWord = false;

            //message to CLI to indicate letter guessed is in the word
            console.log("\n\n" + guess + " is in the word.  Excellent Guess!" + "\n");

            //display the display letters of the game letter objects
            displayWord();

            //call isWordComplete method of word object
            word.isWordComplete();

            //check to see if gameOver boolean of word object has been set to true
            if(word.gameOver === true) {

              //message CLI to indicate win
              console.log("Congratulations!  You have won the game!" + "\n");

              //increment wins count
              wins++

              //increment completed game count
              gameCount++

              //message to CLI to indicate games played, wins, losses
              console.log("Games Played: " + gameCount +  "\xa0\xa0\xa0\xa0" + "Wins: " + wins + "\xa0\xa0\xa0\xa0" + "Losses: " + losses + "\n\n");

              //check to see if any remaining game words in wordArray
              if(wordArray.length > 0) {

                //invoke the inquirer prompt
                inquirer.prompt([

                  //input object to prompt user if they want to play another game
                  {
                    type: "list",
                    name: "newGame",
                    choices: ["Yes", "No"],
                    message: "Would you like to play another game?"
                  }
                ]).then(function(answer) {

                  //check if answer is yes
                  if(answer.newGame === "Yes") {
            
                    //message to CLI to indicate a new game will be started
                    console.log("Excellent!  I will set up for the new game!" + "\n");
            
                    //call newGame function
                    newGame();

                  //if user does not want to play another game
                  } else {

                    //message user to indicate end of session
                    console.log("Maybe later then?  Goodbye!");
                  }
                });

              //if there are no game words left in wordArray
              } else {

                //message user to indicate end of session
                console.log("There are no game words left.  Please play again later!")
              }

            //if there are still letters to be guessed
            } else {

              //prompt the user to make another guess
              guessPrompt();
            }

          //if the letter guessed is not in the word
          } else {

            //increment guess count
            guessCount++

            //message to CLI to indicate letter is not in the word
            console.log(guess + " is not in the word.  Try again!");

            //display the display letters of the game letter objects
            displayWord();

            //prompt the user to make another guess
            guessPrompt();
          }
        }

      //if the character pressed is not a letter
      } else {

        //message to CLI to indicate charactter pressed is not a letter
        console.log("Key pressed is not a letter.  Please try again.");

        //prompt the user to make another guess
        guessPrompt();

      }
    });

  //if the limit of 10 guesses has been reached
  } else {

    //message to CLI to indicate guess limit has been reached and game is over
    console.log("You have reached your limit of guesses.  Game Over!");

    //increment loss count
    losses++

    //increment game count
    gameCount++

    //message to CLI to indicate games played, wins, losses
    console.log("Games Played: " + gameCount + "\xa0\xa0\xa0\xa0" + " Wins: " + wins + "\xa0\xa0\xa0\xa0" + "Losses: " + losses + "\n\n");

    //check to see if any remaining game words in wordArray
    if(wordArray.length > 0) {

      //invoke the inquirer prompt
      inquirer.prompt([

        //input object to prompt user if they want to play another game
        {
          type: "list",
          name: "newGame",
          message: "Would you like to play another game?",
          choices: ["Yes", "No"]
        }
      ]).then(function(answer) {

        //check if answer is yes
        if(answer.newGame === "Yes") {

          //message to CLI to indicate a new game will be started
          console.log("Excellent!  I will set up for the new game!" + "\n");

          //call newGame function
          newGame();

        //if user does not want to play another game
        } else {
          //message user to indicate end of session
          console.log("Maybe later then?  Goodbye!");
        }
      });

    //if there are no remaining game words in wordArray
    } else {

      //message CLI to indicate end of session
      console.log("There are no game words left.  Please play again later!")
    }
  }
}