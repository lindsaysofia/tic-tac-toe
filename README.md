From The Odin Project

1. Store the gameboard as an array inside of a Gameboard object. Players are also going to be stored in object. Also need an object to control the flow of the game itself.
  - Have as little global code as possible. Use modules or a factory.
  - I created a module for the gameBoard and for the displayController. Used a Factory for the players since there will be more than 1.

2. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s).
  - I created the display function within the gameBoard module which will loops over the gameBoardArray and displays its contents.
  - I also added a bit of stylying to make it look more like a tic-tac-toe game :)

3. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
