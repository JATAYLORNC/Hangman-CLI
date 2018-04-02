//Receives game word object array from "main.js" and store it in an object along with
//methods to verify if the guessed letter is in the word and if all of the letters in the
//word have been guessed.


//Object constructor for game word object
Word = function Word(gameWord) {

  //letter object array
  this.word = gameWord;

  //boolean to indicate if guess letter is in word
  this.isInWord = false;

  //boolean to indicate if game is over
  this.gameOver = false;


  //method to check if the letter is in the game word
  this.verifyGuess = function (guessLetter) {

    //loop through each letter in gameWord
    for(i=0; i<this.word.length; i++) {

      //check if lettter guessed is a letter in gameWord
      if(this.word[i].letter === guessLetter || this.word[i].letter === guessLetter.toUpperCase()) {

        //change boolean to indicate letter is in the game word
        this.isInWord = true;

        //call the change Display method of the letter object so that the guessed
        //letter is displayed instead of a blank
        this.word[i].changeDisplay();
      }
    }
  }

  //method to check if all the letters in the word have been guessed correctly
  this.isWordComplete = function() {

    //set variable to count remaining letters
    var remainingLetterCount = 0;

    //loop through word array letter objects
    for(i=0; i<this.word.length; i++) {

      //check to see if display letter is a blank or a letter
      if(this.word[i].displayLetter === "__") {

        //increment count of remaining letters
        remainingLetterCount++;
      }
    }

    //check if there are any remaining letters to be guessed
    if(remainingLetterCount > 0) {

      //set gameOver boolean to false
      this.gameOver = false;
    } else {

      //set gameOver boolean to true
      this.gameOver = true;
    }
  }
}  
  
//export Word object constructor
module.exports = Word;  
  
  
  