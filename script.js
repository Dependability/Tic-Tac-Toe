
/* Fine, I will stop being lazy and instead start with the HTML and CSS first.
We will see how i prefer this over basic HTML and then do Javascript. */

const cell1 = document.querySelector('.class-1')

const Gameboard = function() {
    const board = ['','','','','','','','',''];
    const winCombos = ['012','345','678','036','147','258','048','246']
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

    const check_full = function() {
        return board.every((elem) => elem != '')
    }
    return {check_win, board, check_full};
}

const Player = function(name, symbol) {
    return {name, symbol};
}



const Game = (function () {
    let gameWinner = null;
    const GameBoard = Gameboard();
    const players = [];
    let turn = null;
    const cells = document.querySelectorAll('.cell')


    const _turn = function (e) {
        if (turn != null) {  
            const cell = e.target
            cell.removeEventListener('click',_turn)
            const img = document.createElement('img');
            img.src = `images/${players[turn].symbol}.svg`
            cell.appendChild(img);
            let cellIndex = cell.classList[1].charAt(cell.classList[1].length - 1);
            GameBoard.board[cellIndex - 1] = players[turn].symbol;
            console.log(GameBoard.board)
            if (GameBoard.check_win(players[turn].symbol)) {
                gameWinner = players[turn].name;
                console.log(`${gameWinner} has won`);
                _gameEnd()
                turn = null;
                return null
            }
            if (GameBoard.check_full()) {
                turn = null;
                gameWinner = 'None'
                console.log(`${gameWinner} has won`);
                return null
            }
            

            turn = (turn == 0) ? 1 : 0
    }
    }

    const _gameEnd = function() {
        cells.forEach(cell => {
            cell.removeEventListener('click', _turn)
        });
    }

    cells.forEach((cell) => {
        cell.addEventListener('click', _turn)})

    const startGame = function() {
        turn = 0;
        }

    
    
    return {startGame, players}
})();

Game.players.push(Player('Seyi', 'O'), Player('CPU', 'X'))
Game.startGame();