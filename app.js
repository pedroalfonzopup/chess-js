const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player-display")
const infoDisplay = document.querySelector("#info-display")
const width = 8
const lenght = 8
let playerTurn = "white"
playerDisplay.textContent = playerTurn

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
        square.firstChild?.setAttribute('draggable', true)
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

const allSquares = document.querySelectorAll(".square")

allSquares.forEach( square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})


function dragStart (event) {
    startPosition = event.target.parentNode.getAttribute('square-id')
    draggedPiece = event.target
    console.log(draggedPiece)
}

let startPosition
let draggedPiece

function dragOver (event) {
    event.preventDefault()
    
}

function dragDrop (event) {
    event.stopPropagation()

    const taken = event.target.classList.contains("piece")
    event.target.parentNode.append(draggedPiece)
    //event.target.append(draggedPiece)
    event.target.remove()
    changePlayer()
} 

function changePlayer() {
    if ( playerTurn === "white" ) {
        playerTurn = "black"
    } else playerTurn = "white"
    playerDisplay.textContent = playerTurn
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i ))
}

function revertIds() {

}




