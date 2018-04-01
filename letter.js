//Receives game word from "word.js" and converts it to a series of letter objects
//each containing a letter in the word and a blank placeholder.

//Letter object constructor function
Letter = function Letter(gameLetter) {

  this.letter = gameLetter;
  this.displayLetter = "__";

  this.changeDisplay = function() {
    this.displayLetter = this.letter; 
  }

  this.printLetter = function() {
    console.log(this.displayLetter + " ");
  }
}

module.exports = Letter;

