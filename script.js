const game = (function () {
  let player1Turn = true;
  let finishedGame = false;
  const X = 'X';
  const O = 'O';
  const TIE = 'TIE';
  const winningXRegex = /(XXX[XO1]{6})|([XO1]{3}XXX[XO1]{3})|([XO1]{6}XXX)|(X[XO1]{2}X[XO1]{2}X[XO1]{2})|([XO1]X[XO1]{2}X[XO1]{2}X[XO1])|([XO1]{2}X[XO1]{2}X[XO1]{2}X)|(X[XO1]{3}X[XO1]{3}X)|([XO1]{2}X[XO1]X[XO1]X[XO1]{2})/i;
  const winningORegex = /(OOO[XO1]{6})|([XO1]{3}OOO[XO1]{3})|([XO1]{6}OOO)|(O[XO1]{2}O[XO1]{2}O[XO1]{2})|([XO1]O[XO1]{2}O[XO1]{2}O[XO1])|([XO1]{2}O[XO1]{2}O[XO1]{2}O)|(O[XO1]{3}O[XO1]{3}O)|([XO1]{2}O[XO1]O[XO1]O[XO1]{2})/i;
  const gameStatus = document.querySelector('.game-status');
  let gameboardContainer = document.querySelector('.gameboard');

  const gameOver = (outcome) => {
    switch(outcome) {
      case X:
        gameStatus.textContent = `Player 1 Wins!`;
        break;
      case O:
        gameStatus.textContent = `Player 2 Wins!`;
        break;
      case TIE:
        gameStatus.textContent = `It's a tie!`;
        break;
    }
    finishedGame = true;
  }

  const togglePlayer = () => {
    player1Turn = !player1Turn;
    gameStatus.textContent = player1Turn ? `Player 1's Turn` : `Player 2's Turn`;
  };

  const handleGameboardSelection = e => {
    if (finishedGame) return;
    let index = e.target.dataset.index;
    let selection = player1Turn ? X : O;
    gameboard.setGamepiece(index, selection);
  }

  gameboardContainer.addEventListener('click', handleGameboardSelection);

  return {
    gameboardContainer,
    X,
    O,
    gameOver,
    togglePlayer,
    winningXRegex,
    winningORegex,
  };
})();

const gameboard = (function () {
  let gameboardArray = Array(9).fill(1);
  
  const display = () => {
    game.gameboardContainer.innerHTML = '';
    gameboardArray.forEach((gamepiece, index) => {
      let gamepieceElement = document.createElement('button');
      gamepieceElement.dataset.index = index;
      gamepieceElement.classList.add('gamepiece');
      gamepieceElement.innerHTML = gamepiece === 1 ? '' : gamepiece;
      game.gameboardContainer.appendChild(gamepieceElement);
    });
  };

  const setGamepiece = (index, selection) => {
    if (gameboardArray[index] !== 1) return;
    gameboardArray[index] = selection;

    display();

    if (game.winningXRegex.test(gameboardArray.join(''))) {
      game.gameOver(game.X);
      return;
    } else if (game.winningORegex.test(gameboardArray.join(''))) {
      game.gameOver(game.O);
      return;
    } else if (!gameboardArray.join('').includes(1)) {
      game.gameOver(game.TIE);
      return;
    }

    game.togglePlayer();
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