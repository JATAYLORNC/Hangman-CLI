// dependency for inquirer npm package
var inquirer = require("inquirer");

//dependency for is-letter npm package
var isLetter = require('is-letter');

//dependency for Letter constructor
var Letter = require("./letter.js");

//dependency for Word constructor
var Word = require("./word.js");

var gameLetterArray;

var word;

var gameOver;

var guessCount;

var gameWord;

var previousGuess;

var previousGuessBoolean;

newGame();

function newGame() {

  //reset gameLetter Array
  gameLetterArray = [];

  previousGuess = [];

  previousGuessBoolean = false;

  //select game word
  gameWord = selectGameWord();

  console.log(gameWord);

  //construct letter objects for game word and push to gameLetterArray
  gameLetterArray = constructLetterObjects(gameWord);

  //construct word object for gameWord
  word = new Word(gameLetterArray);

  //reset guess count
  guessCount = 0;

  console.log("Lets play hangman!" + "\n");

  console.log("Type a letter..." + "\n");

  displayWord();

  guessPrompt();

}

function selectGameWord () {

  //define gameWord Array
  var wordArray = ["Pooh", "Piglet", "Eeyore", "Tigger", "Aladdin", "Genie", "Mickey", "Minnie", "Marie", "Omalley", "Berlioz", 
    "Toulouse", "Duchess", "Lilo", "Stitch", "Cinderella", "Jasmine", "Goofy", "Pluto", "Donald", "Daisy", "Bambi", "Thumper", "Flower", "Roo",
    "Kanga", "Rabbit", "Owl", "Gopher", "Baloo", "Bagheera", "Mowgli", "Kaa"];

  //Select game word
  var gameWordIndex = Math.floor(Math.random() * wordArray.length);
  var newGameWord = wordArray[gameWordIndex];

  return newGameWord;
}

function constructLetterObjects(newWord) {

  //construct array of letter objects for gameWord
  //loop through each letter of the game word

  for(i=0; i<newWord.length; i++) {

    //variable to capture game letter at location index i
    var gameLetter = newWord.charAt(i);

    //construct letter object for game letter
    var letterObject = new Letter(gameLetter);

    //check if game letter is a space between words
    // if(gameLetter = " ") {

    //   //change the display from a blank to a space
    //   letterObject.changeDisplay();
    // }

    //push the letter object to the game letter array
    gameLetterArray.push(letterObject);
  }

  return gameLetterArray;
}

function displayWord() {

  for(i=0; i<word.word.length; i++) {

    word.word[i].printLetter();  
  }

  console.log("Previous Guesses: " + previousGuess + "\n");

}

function guessPrompt() {

  if(guessCount < 10) {

    console.log(guessCount);

    inquirer.prompt([
      {
        type: "input",
        name: "guess",
        message: "Enter a letter."
      }
    ]).then(function(answer) {

      var guess = answer.guess.toLowerCase();
      
      //check if input character is a letter
      if(isLetter(guess) === true) {

        if(previousGuess.indexOf(guess) >= 0) {

          console.log("Letter has already been guessed!  Please choose another letter!" + "\n");

          displayWord();

          guessPrompt();

        }  else {

          previousGuess.push(guess);
      
          //check if letter is in the gameword
          word.verifyGuess(guess);

          if(word.isInWord === true) {

            word.isInWord = false;

            console.log(guess + " is in the word.  Excellent Guess!" + "\n");

            displayWord();

            word.isWordComplete();

            gameOver = word.gameOver;

            console.log(gameOver);

            if(gameOver === true) {

              console.log("Congratulations!  You have won the game!" + "\n");

              inquirer.prompt([
                {
                  type: "list",
                  name: "newGame",
                  choices: ["Yes", "No"],
                  message: "Would you like to play another game?"
                }
              ]).then(function(answer) {
          
                if(answer.newGame === "Yes") {
          
                  console.log("Excellent!  I will set up for the new game!" + "\n");
          
                  newGame();
                } else {
                  console.log("Maybe later then?  Goodbye!");
                }
              });

            } else {

              guessPrompt();
            }

          } else {

            guessCount++

            console.log(guess + " is not in the word.  Try again!");

            displayWord();

            guessPrompt();
          }
        }
      }
    });
  } else {
    console.log("You have reached your limit of guesses.  Game Over!");

    inquirer.prompt([
      {
        type: "list",
        name: "newGame",
        message: "Would you like to play another game?",
        choices: ["Yes", "No"]
      }
    ]).then(function(answer) {

      if(answer.newGame === "Yes") {

        console.log("Excellent!  I will set up for the new game!" + "\n");

        newGame();
      } else {
        console.log("Maybe later then?  Goodbye!");
      }
    });
  }
}