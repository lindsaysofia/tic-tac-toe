const Player = gamepiece => {
  let score = 0;
  gamepiece = gamepiece.toUpperCase();

  const getScore = () => {
    return score;
  }

  const increaseScore = () => {
    score++;
  }

  const resetScore = () => {
    score = 0;
  };

  return {
    getScore,
    increaseScore,
    resetScore,
  };
};

const game = (function () {
  const X = 'X';
  const O = 'O';
  let playerXTurn = true;
  let playerX = Player(X);
  let playerO = Player(O);
  let finishedGame = false;
  const TIE = 'TIE';
  const winningXRegex = /(XXX[XO1]{6})|([XO1]{3}XXX[XO1]{3})|([XO1]{6}XXX)|(X[XO1]{2}X[XO1]{2}X[XO1]{2})|([XO1]X[XO1]{2}X[XO1]{2}X[XO1])|([XO1]{2}X[XO1]{2}X[XO1]{2}X)|(X[XO1]{3}X[XO1]{3}X)|([XO1]{2}X[XO1]X[XO1]X[XO1]{2})/i;
  const winningORegex = /(OOO[XO1]{6})|([XO1]{3}OOO[XO1]{3})|([XO1]{6}OOO)|(O[XO1]{2}O[XO1]{2}O[XO1]{2})|([XO1]O[XO1]{2}O[XO1]{2}O[XO1])|([XO1]{2}O[XO1]{2}O[XO1]{2}O)|(O[XO1]{3}O[XO1]{3}O)|([XO1]{2}O[XO1]O[XO1]O[XO1]{2})/i;
  const gameStatus = document.querySelector('.game-status');
  const restartButton = document.querySelector('.restart');
  const newGameButton = document.querySelector('.new-game');
  const confettiContainer = document.querySelector('.container');
  let playerXScore = document.querySelector('.playerX-score');
  let playerOScore = document.querySelector('.playerO-score');
  let gameboardContainer = document.querySelector('.gameboard');

  const restartGame = () => {
    playerX.resetScore();
    playerO.resetScore();
    updatePlayerScores();
    newGame();
  }

  const newGame = () => {
    confettiContainer.innerHTML = '';
    playerXTurn = true;
    finishedGame = false;
    gameStatus.textContent = playerXTurn ? `Player X's Turn` : `Player O's Turn`;
    gameboard.resetGameboard();
    gameboard.display();
  };

  const gameOver = (outcome) => {
    switch(outcome) {
      case X:
        playerX.increaseScore();
        gameStatus.textContent = `Player X Wins!`;
        break;
      case O:
        playerO.increaseScore();
        gameStatus.textContent = `Player O Wins!`;
        break;
      case TIE:
        playerX.increaseScore();
        playerO.increaseScore();
        gameStatus.textContent = `It's a tie!`;
        break;
    }
    finishedGame = true;
    updatePlayerScores();
    createConfetti();
  }

  const updatePlayerScores = () => {
    playerXScore.textContent = playerX.getScore();
    playerOScore.textContent = playerO.getScore();
  }

  const togglePlayer = () => {
    playerXTurn = !playerXTurn;
    gameStatus.textContent = playerXTurn ? `Player X's Turn` : `Player O's Turn`;
  };

  const handleGameboardSelection = e => {
    if (finishedGame) return;
    let index = e.target.dataset.index;
    let selection = playerXTurn ? X : O;
    gameboard.setGamepiece(index, selection);
  }

  const createConfetti = () => {
    for (let i = 1; i <= 50; i++) {
      let confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confettiContainer.appendChild(confetti);
    }
  };

  gameboardContainer.addEventListener('click', handleGameboardSelection);
  restartButton.addEventListener('click', restartGame);
  newGameButton.addEventListener('click', newGame);

  return {
    gameboardContainer,
    X,
    O,
    TIE,
    gameOver,
    togglePlayer,
    winningXRegex,
    winningORegex,
  };
})();

const gameboard = (function () {
  let gameboardArray = Array(9).fill(1);

  const resetGameboard = () => {
    gameboardArray = Array(9).fill(1);
  }
  
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
    resetGameboard,
  };
})();

gameboard.display();