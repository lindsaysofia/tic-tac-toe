const gameBoard = (function () {
  // let gameBoardArray = Array(9).fill(null);
  let gameBoardArray = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];
  
  const display = () => {
    gameBoardArray.forEach((gamepiece, index) => {
      let gamepieceElement = document.createElement('button');
      gamepieceElement.dataset.index = index;
      gamepieceElement.classList.add('gamepiece');
      gamepieceElement.innerHTML = gamepiece;
      displayController.gameBoard.appendChild(gamepieceElement);
    });
  };

  return {
    display,
  };
})();

const displayController = (function () {
  let gameBoard = document.querySelector('.gameboard');
  return {
    gameBoard,
  };
})();

const Player = name => {
  return {

  };
};

gameBoard.display();