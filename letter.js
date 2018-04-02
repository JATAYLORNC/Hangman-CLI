//Receives game word from "word.js" and converts it to a series of letter objects
//each containing a letter in the word and a blank placeholder.

//Letter object constructor function
Letter = function Letter(gameLetter) {

  //letter in game word
  this.letter = gameLetter;

  //what will be displayed by printLetter method
  this.displayLetter = "__";

  //method to change the display letter from blank to game letter
  this.changeDisplay = function() {
    this.displayLetter = this.letter; 
  }

  //method to print this display letter to the CLI
  this.printLetter = function() {

    //display letter to the CLI
    //ensures that all letters in the word are displayed on the same line
    process.stdout.write(this.displayLetter + " ");
  }
}

//export Letter object constructor
module.exports = Letter;

