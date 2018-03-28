














// dependency for inquirer npm package
var inquirer = require("inquirer");

//dependency for is-letter npm package
var isLetter = require('is-letter');

inquirer.prompt([
  {
    type: "input",
    name: "guess",
    message: "Enter a letter."
  }
]).then(function(letter) {
  
  if(isLetter(letter) === true) {

  }

});