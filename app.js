const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player-display")
const infoDisplay = document.querySelector("#info-display")
const width = 8
const lenght = 8
let playerTurn = "white-piece"
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
reverseIds()

const allSquares = document.querySelectorAll(".square")

allSquares.forEach( square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

function dragStart (event) {
    startPosition = event.target.parentNode.getAttribute('square-id')
    draggedPiece = event.target
}

let startPosition
let draggedPiece

function dragOver (event) {
    event.preventDefault()
    
}

function dragDrop (event) {
    event.stopPropagation()

    const valid = checkIfValid(event.target)
    const correctTurn = draggedPiece.firstChild.classList.contains(playerTurn)
    const opponentTurn = playerTurn === 'white-piece' ? 'black-piece' : 'white-piece'
    const taken = event.target.classList.contains("piece")
    const takenByOpponent = event.target.firstChild?.classList.contains(opponentTurn)
    

    if (correctTurn) {
        // CHECK IF CORRECTTURN WORKS
        if (takenByOpponent && valid) {
            event.target.parentNode.append(draggedPiece)
            event.target.remove()
            changePlayer()
            return
        }
        if (taken && !takenByOpponent) {
            return
        }
        if (valid) {
            event.target.append(draggedPiece)
            changePlayer()
            return
        }
    }
} 

function changePlayer() {
    if ( playerTurn === "white-piece" ) {
        playerTurn = "black-piece"
        revertIds()
        playerDisplay.textContent = playerTurn
    } else {
        playerTurn = "white-piece"
        reverseIds()
        playerDisplay.textContent = playerTurn
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i ) => square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i ) => square.setAttribute('square-id', i))
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPosition)
    const piece = draggedPiece.id
    //El mago tira magia:
    const startRow = [8,9,10,11,12,13,14,15]
    const endRow = [58,57,58,59,60,61,62,63]

    const opponentTurn = playerTurn === 'white-piece' ? 'black-piece' : 'white-piece'
    const takenByOpponent = event.target.firstChild?.classList.contains(opponentTurn)

    switch(piece) {
        case 'pawn': { // ALL MOVES FOR PAWN
                // MOVE 1 SQUARE FORWARD
                if (startId + width === targetId && !takenByOpponent) {
                    return true
                }
                // MOVE 2 SQUARES FORWARD
                if (startRow.includes(startId) && startId + width * 2 === targetId && !takenByOpponent) {
                    return true
                }
                // DIAGONAL TAKE
                if ((startId + width + 1 === targetId || startId + width - 1 === targetId) && takenByOpponent) {
                    return true
                }
                return false
            }
            break;
        case 'knight': {
                if ( startId + width * 2 + 1 === targetId ) {return true}
                if ( startId + width * 2 - 1 === targetId ) {return true}
                if ( startId - width * 2 + 1 === targetId ) {return true}
                if ( startId - width * 2 - 1 === targetId ) {return true}
                if ( startId - width -2 === targetId ) {return true}
                if ( startId - width +2 === targetId ) {return true}
                if ( startId + width -2 === targetId ) {return true}
                if ( startId + width +2 === targetId ) {return true}
                return false
            }
            break;
        case 'queen': {}
        case 'king': {}
    }
    console.log(playerTurn)
}


