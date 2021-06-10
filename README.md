From The Odin Project

1. Store the gameboard as an array inside of a Gameboard object. Players are also going to be stored in object. Also need an object to control the flow of the game itself.
  - Have as little global code as possible. Use modules or a factory.
  - I created a module for the gameBoard and for the displayController. Used a Factory for the players since there will be more than 1.

2. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s).
  - I created the display function within the gameBoard module which will loops over the gameBoardArray and displays its contents.
  - I also added a bit of stylying to make it look more like a tic-tac-toe game :)

3. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken! 
  - I added a click event listener to teh gameboard. Whenever a user clicks on the gameboard, the game will use the current player (player X or O) as well as the gamepiece that was clicked to determine if the X or O can be placed. If the selection is successful (there was no piece already there), then it switches to the next player's turn;

4. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
  - Not sure if this was the most efficient way (probs not), but I used a regex to determine if my array (when joined as a string) matched the winning combinations. If so, I called the gameOver function which essentially alerts who won (or a tie), and sets the gameFinished property to true so that additional boxes can no longer be clicked.

5. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
  - I decided not to add names and to just keep it as PLayer X and player O.
  - I did include a new game button, which will start a new game, but keep the current scores.
  - I added a restart button, which will restart the entire game and clear the current scores.
  - There is an game-status element which will state the current player's turn and also congratulate the winning player (or a tie).
