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
  let player1Turn = true;
  let player1 = Player(X);
  let player2 = Player(O);
  let finishedGame = false;
  const TIE = 'TIE';
  const winningXRegex = /(XXX[XO1]{6})|([XO1]{3}XXX[XO1]{3})|([XO1]{6}XXX)|(X[XO1]{2}X[XO1]{2}X[XO1]{2})|([XO1]X[XO1]{2}X[XO1]{2}X[XO1])|([XO1]{2}X[XO1]{2}X[XO1]{2}X)|(X[XO1]{3}X[XO1]{3}X)|([XO1]{2}X[XO1]X[XO1]X[XO1]{2})/i;
  const winningORegex = /(OOO[XO1]{6})|([XO1]{3}OOO[XO1]{3})|([XO1]{6}OOO)|(O[XO1]{2}O[XO1]{2}O[XO1]{2})|([XO1]O[XO1]{2}O[XO1]{2}O[XO1])|([XO1]{2}O[XO1]{2}O[XO1]{2}O)|(O[XO1]{3}O[XO1]{3}O)|([XO1]{2}O[XO1]O[XO1]O[XO1]{2})/i;
  const gameStatus = document.querySelector('.game-status');
  const restart = document.querySelector('.restart');
  let player1Score = document.querySelector('.player1-score');
  let player2Score = document.querySelector('.player2-score');
  let gameboardContainer = document.querySelector('.gameboard');

  const restartGame = () => {
    player1.resetScore();
    player2.resetScore();
    updatePlayerScores();
    player1Turn = true;
    finishedGame = false;
    gameStatus.textContent = player1Turn ? `Player 1's Turn` : `Player 2's Turn`;
    gameboard.resetGameboard();
    gameboard.display();
  }

  const gameOver = (outcome) => {
    switch(outcome) {
      case X:
        player1.increaseScore();
        gameStatus.textContent = `Player 1 Wins!`;
        break;
      case O:
        player2.increaseScore();
        gameStatus.textContent = `Player 2 Wins!`;
        break;
      case TIE:
        player1.increaseScore();
        player2.increaseScore();
        gameStatus.textContent = `It's a tie!`;
        break;
    }
    finishedGame = true;
    updatePlayerScores();
  }

  const updatePlayerScores = () => {
    player1Score.textContent = player1.getScore();
    player2Score.textContent = player2.getScore();
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
  restart.addEventListener('click', restartGame);

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