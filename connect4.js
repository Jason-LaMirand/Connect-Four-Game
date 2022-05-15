/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let wide = document.getElementById('wide');
let high = document.getElementById('high');

const startBtn = document.querySelector('#start');
startBtn.addEventListener('click', mainGame);
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', () => location.reload());


function mainGame(e) {
    e.preventDefault();

    if (wide.value >= 4 && high.value >= 4 && wide.value <= 20 && high.value <= 20) {
        startBtn.style.pointerEvents = 'none';




        const WIDTH = wide.value;
        const HEIGHT = high.value;

        let currPlayer = 1; // active player: 1 or 2
        let board = []; // array of rows, each row is array of cells  (board[y][x])

        /** makeBoard: create in-JS board structure:
         *    board = array of rows, each row is array of cells  (board[y][x])
         */


        const makeBoard = (HEIGHT, WIDTH) => {
            // My orginal code. I needed help to create the code below. I realized i needed to push
            //    for(let i = 0; i < HEIGHT; i++){
            //       for(let j = 0; j < WIDTH; j++){
            //          if(!board[i]){
            //             board[i] = [];
            //          };
            //          board[i][j] = null;
            //       };
            //    };
            //    return board;
            // };

            while (board.length <= HEIGHT - 1) {
                board.push(Array.from({ length: WIDTH }));
            }
        }
        console.log(makeBoard(HEIGHT, WIDTH));

        /** makeHtmlBoard: make HTML table and row of column tops. COMPLETED */

        function makeHtmlBoard() {
            // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
            const htmlBoard = document.querySelector('#board');
            const divGame = document.getElementById('game');
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
            divGame.append(htmlBoard);
        }

        /** findSpotForCol: given column x, return top empty y (null if filled) */

        function findSpotForCol(x) {
            // TODO: write the real version of this, rather than always returning 0

            for (let i = HEIGHT - 1; i >= 0; i--) {
                if (!board[i][x]) {
                    return i;
                }
            } return null;

        }

        /** placeInTable: update DOM to place piece into HTML table of board */

        function placeInTable(y, x) {
            // TODO: make a div and insert into correct table cell
            const gamePiece = document.createElement('div');
            const targetCell = document.getElementById(`${y}-${x}`);
            gamePiece.classList.add("piece");
            if (currPlayer === 1) {
                gamePiece.classList.add("p1");
            }
            else {
                gamePiece.classList.add("p2");
            }

            targetCell.append(gamePiece);



        }

        /** endGame: announce game end */

        function endGame(msg) {
            alert(msg);
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
            board[y][x] = currPlayer;
            placeInTable(y, x);


            // check for win
            if (checkForWin()) {
                return endGame(`Player ${currPlayer} won!`);
            }

            // check for tie
            // TODO: check if all cells in board are filled; if so call, call endGame
            // board.every(function(value) {
            //   if (value === 1 || value === 2){
            //     alert("You have tied! Try again!");
            //   }
            // })
            if (board.every(n => n.every(c => c))) {
                return endGame('You tied! Try again!');
            }


            // switch players
            // TODO: switch currPlayer 1 <-> 2  
            switchPlayer(currPlayer);

        }

        // console.log(makeBoard(HEIGHT, WIDTH));

        // Function to switch players
        function switchPlayer(player) {
            if (player === 1) {
                currPlayer = 2;
            }
            else {
                currPlayer = 1;
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
            for (let y = 0; y < HEIGHT; y++) {   //This creates a loop through rows
                for (let x = 0; x < WIDTH; x++) {  //This creates a loop through columns
                    // This puts 4 cells together horizontally, vertically, and diagonally.
                    let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                    let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                    let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                    let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

                    if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                        return true; // this checks to see if there is 4 in a row and then the win function takes the input and returns true if they are all 4 in a row.
                    }
                }
            }
        }

        makeBoard();
        makeHtmlBoard();


        wide.value = '';
        high.value = '';

    }
    else if (wide.value === '' || high.value === '') {
        alert('Please enter width and height');
    }
    else if (wide.value < 4 || high.value < 4) {
        alert('Please enter a width and height greater than 4');
        wide.value = '';
        high.value = '';
    }
    else if (wide.value > 20 || high.value > 20) {
        alert('Please enter a width and height of 20 or less');
        wide.value = '';
        high.value = '';
    }
}
