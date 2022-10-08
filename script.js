
/* Fine, I will stop being lazy and instead start with the HTML and CSS first.
We will see how i prefer this over basic HTML and then do Javascript. */

const cell1 = document.querySelector('.class-1')

const Gameboard = function() {
    let board = ['','','','','','','','',''];
    const winCombos = ['012','345','678','036','147','258','048','246'];
    const check_win = function(symbol) {
        let returnVar = false;
        indexBoard = board.map((elem, index)=> (elem === symbol) ? index : '').filter((elem) => elem !== '');
        winCombos.forEach((elem)=>{
            const spacedOut = elem.split('');
            if (spacedOut.every(thing => indexBoard.includes(+thing))) { //check if all the wincombo nums are in the board 0346
                returnVar = true;
                return '';
            }
        })  
        return returnVar;
    }
    const reset = function() {
        board.forEach((elem, index)=> {
            board[index] = '';
        })
        console.log(board)
    }

    const check_full = function() {
        return board.every((elem) => elem != '')
    }
    return {check_win, board, check_full, reset};
}

const Player = function(name, symbol) {
    return {name, symbol};
}



const Game = (function () {
    let gameWinner = null;
    const GameBoard = Gameboard();
    const players = [];
    let turn = null;
    const cells = document.querySelectorAll('.cell');
    const winnerDisplay = document.querySelector('.winner');
    let mode = 'CPU';

    const displayWinner = function() {
        winnerDisplay.textContent = (gameWinner == 'draw') ? 'Draw.' : `${gameWinner} has won!`;
        winnerDisplay.classList.add('visible');
        console.log(winnerDisplay.classList)
    }

    const _minimax = function() {

    }


    const _turn = function (e) {
        if (turn != null) {  
            const cell = e.target
            cell.removeEventListener('click',_turn)
            const img = document.createElement('img');
            img.src = `images/${players[turn].symbol}.svg`
            cell.appendChild(img);
            let cellIndex = cell.classList[1].charAt(cell.classList[1].length - 1);
            GameBoard.board[cellIndex - 1] = players[turn].symbol;
            if (GameBoard.check_win(players[turn].symbol)) {
                gameWinner = players[turn].name;
                displayWinner();
                turn = null;
                return null
            }
            if (GameBoard.check_full()) {
                turn = null;
                gameWinner = 'draw'
                displayWinner();
                return null
            }

            turn = (turn == 0) ? 1 : 0;
        
            if (mode == 'CPU') {
                //Choose random Cell
                let choice = GameBoard.board.map((elem1, index) => index).filter(elem => GameBoard.board[elem] == '');
                let cellIndex = choice[Math.floor(Math.random() * choice.length)];
                GameBoard.board[cellIndex] = players[turn].symbol;

                //Use MiniMax
                /*Imagine some elaboratae recursive algorithm, that I was
                patient enough to implement */

                const chosenCell = document.querySelector(`.cell-${cellIndex + 1}`)
                chosenCell.removeEventListener('click',_turn)
                const img = document.createElement('img');
                img.src = `images/${players[turn].symbol}.svg`
                chosenCell.appendChild(img);


                
                if (GameBoard.check_win(players[turn].symbol)) {
                    gameWinner = players[turn].name;
                    displayWinner();
                    turn = null;
                    return null
                }
                if (GameBoard.check_full()) {
                    turn = null;
                    gameWinner = 'draw';
                    displayWinner();
                    return null
                }
                turn = (turn == 0) ? 1 : 0;
            }
    }


    }

    const _gameEnd = function() {
        winnerDisplay.classList.remove('visible');
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.removeEventListener('click', _turn)
        });
    }



    const startGame = function() {
        _gameEnd()
        gameWinner = null;
        GameBoard.reset()
        //CPU MODE
        turn = 0;
        cells.forEach((cell) => {
            cell.addEventListener('click', _turn)})
        }

    const restart = function() {
        _gameEnd()
        gameWinner = null;
        GameBoard.reset()
        turn = 0;
        cells.forEach((cell) => {
            cell.addEventListener('click', _turn)})
    }
    
    
    return {startGame, players, restart}
})();


const startBtn = document.querySelector('.start')
startBtn.addEventListener('click', () => {
    Game.startGame();
}
)

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => {
    Game.startGame();
}
)
Game.players.push(Player('Seyi', 'O'), Player('CPU', 'X'))
