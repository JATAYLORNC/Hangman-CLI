//do I need this?
var Letter = require("./letter.js");

Word = function Word(gameWord) {

  this.word = gameWord;
  this.isInWord = false;
  this.gameOver = false;


  //method to check if the letter was previously guessed and
  //if it is in the game word
  this.verifyGuess = function (guessLetter) {

    //loop through each letter in gameWord
    for(i=0; i<this.word.length; i++) {

      console.log(this.word[i].displayLetter);

      //check if lettter guessed is a letter in gameWord
      if(this.word[i].letter === guessLetter || this.word[i].letter === guessLetter.toUpperCase()) {

        this.isInWord = true;

        this.word[i].changeDisplay();
      }
    }
  }

  //method to check if all the letters in the word have been guessed correctly
  this.isWordComplete = function() {

    var remainingLetterCount = 0;

    //loop through word array letter objects
    for(i=0; i<this.word.length; i++) {

      if(this.word[i].displayLetter === "__") {
        remainingLetterCount++;
      }
    }

    if(remainingLetterCount > 0) {
      this.gameOver = false;
    } else {
      this.gameOver = true;
    }
  }
}  
  
module.exports = Word;  
  
  
  