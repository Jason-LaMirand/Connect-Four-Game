/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let activePlayer = 'p1';
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


const makeBoard = (HEIGHT, WIDTH) => {
    const board = [];
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (!board[i]) {
                board[i] = [];
            };
            board[i][j] = null;
        };
    };
    return board;
};
// console.log(makeBoard(HEIGHT, WIDTH));

/** makeHtmlBoard: make HTML table and row of column tops. COMPLETED */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector('#board');
    // TODO: We are setting a variable called top and giving it an id = calumn-top. We are also setting up an eventlistener on the row.
    let top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);
    // TODO:Creating the length of the table set by the varibale WIDTH. Giving each cell a id = x.
    for (let x = 0; x < WIDTH; x++) {
        let headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    htmlBoard.append(top);

    // TODO: Creating the rows of the table set by the variable HEIGHT. Giving each row and id.
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0

    return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const gamePiece = document.createElement('div');
    const targetCell = document.getElementById(`${y}-${x}`);
    gamePiece.classList.add("piece", activePlayer);
    targetCell.append(gamePiece);



}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame

    // switch players
    // TODO: switch currPlayer 1 <-> 2  
    switchPlayer(currPlayer);

}
// Function to switch players
function switchPlayer(player) {
    if (player === '1') {
        currPlayer = '2';
        activePlayer = 'p2';
    } else {
        currPlayer = '1';
        activePlayer = 'p1';
    }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.
    // This code lets us decide how a player wins. It sets up a win if you have 4 in a row in different directions.
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();
