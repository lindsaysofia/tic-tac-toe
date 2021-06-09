const game = (function () {
  let player1Turn = true;
  const X = 'X';
  const O = 'O';
  const gameStatus = document.querySelector('.game-status');
  let gameboardContainer = document.querySelector('.gameboard');

  const updateStatus = () => {
    gameStatus.textContent = player1Turn ? `Player 1's Turn` : `Player 2's Turn`;
  };

  const handleGameboardSelection = e => {
    let index = e.target.dataset.index;
    let selection = player1Turn ? X : O;
    let successfulPlacement = gameboard.setGamepiece(index, selection);
    if (successfulPlacement) {
      player1Turn = !player1Turn
    }
    updateStatus();
  }

  gameboardContainer.addEventListener('click', handleGameboardSelection);

  return {
    gameboardContainer,
    X,
    O,
  };
})();

const gameboard = (function () {
  let gameboardArray = Array(9).fill(null);
  
  const display = () => {
    game.gameboardContainer.innerHTML = '';
    gameboardArray.forEach((gamepiece, index) => {
      let gamepieceElement = document.createElement('button');
      gamepieceElement.dataset.index = index;
      gamepieceElement.classList.add('gamepiece');
      gamepieceElement.innerHTML = gamepiece;
      game.gameboardContainer.appendChild(gamepieceElement);
    });
  };

  const setGamepiece = (index, selection) => {
    if (gameboardArray[index] !== null) return false;
    gameboardArray[index] = selection;
    display();
    return true;
  };

  return {
    display,
    setGamepiece,
  };
})();

const Player = name => {
  name = name.toUpperCase();
  return {

  };
};

gameboard.display();
let playerX = Player(game.X);
let playerO = Player(game.O);