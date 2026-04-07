const gameBoard = document.querySelector("#gameboard")
const playerTurn = document.querySelector("#player-turn")
const infoDisplay = document.querySelector("#info-display")
const width = 8
const lenght = 8

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, king, queen, bishop, knight, rook,
]

function createBoard() {
    startPieces.forEach((piece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = piece
        square.setAttribute('square-id', i)

        const row = Math.floor( (63 - i) / 8 ) + 1
        if ( row % 2 === 0 ) {
            square.classList.add(i % 2 === 0 ? "white" : "black")
        } else {
            square.classList.add(i % 2 === 0 ? "black" : "white")
        }

        if ( i <= 15 ) {square.firstChild.firstChild.classList.add('black-piece')} 
        if ( i >= 48 ) {square.firstChild.firstChild.classList.add('white-piece')}

        gameBoard.append(square)
    })
}

createBoard()