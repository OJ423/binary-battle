const playerTurn = document.getElementById('turn')
const inst = document.getElementById('instructions')
const squares = document.querySelectorAll('.game-square')
const reset = document.getElementById('reset')
const winnerMsg = document.getElementById('winner-announcement')
const bkg = document.querySelector('body')
const oneTotal = document.getElementById('oneWinsTotal')
const zeroTotal = document.getElementById('zeroWinsTotal')
const scoresToZero = document.getElementById('scores')

// Local storage for running scores total
let gameWon = false
let oneWins = 0
if(localStorage.oneWinsLocal) oneWins = localStorage.oneWinsLocal
else {oneWins = 0}
let zeroWins = 0
if(localStorage.zeroWinsLocal) zeroWins = localStorage.zeroWinsLocal
else {zeroWins = 0}
let numGames = 0


// Toggle Between Players
let icon = '1'


const toggle = () => {
  if (icon === '1') {
    icon = '0'
    playerTurn.innerText = "Come on zero, let's make you a hero"
  }
  else {
    icon = '1'
    playerTurn.innerText = "Are you the one to win? Your turn one."
  }
}

// If game square is empty

squares.forEach((square) => {
  square.addEventListener('click', 
    () => {
      if (!gameWon && !square.innerText) {
        square.innerText = `${icon}`
        toggle()
        checkForWinner()
      }
      if(square.innerText === "1") {
        square.style.border = 'solid 3px cadetblue';
      }
      if(square.innerText === "0") {
        square.style.border = 'solid 3px darkmagenta'
      }
    })
})

// Reset Game

const resetGame = () => {
  squares.forEach((square) => {
    square.innerText = '';
    square.style.backgroundColor = 'blueviolet';
    square.style.border = 'solid 3px blueviolet'
  })
  numGames++
  gameWon = false
  localStorage.setItem('numGames', numGames)
  if(localStorage.numGames === 1 || localStorage.numGames % 2 === 1) {
    icon = '0'
    playerTurn.innerText = "Zero to begin"
  }
  else {
    icon = '1'
    playerTurn.innerText = "One to start"
  }
  inst.innerText = "Click on a square to go"
  bkg.style.background = "#332941"

  winCode = null
}

reset.addEventListener('click', resetGame)
console.log(localStorage.gameCount)
// Check winners

const checkForWinner = () => {
  let oneArray = [];
  let zeroArray = [];
  // create arrays of box numbers for 1s and 0s
  squares.forEach(
      (square) => {
          if ( square.textContent ) {
              if ( square.textContent === '1' ) {
                  oneArray.push(parseInt(square.id));
              }    
              if ( square.textContent === '0' ) {
                  zeroArray.push(parseInt(square.id));   
              }    
          }         
      }
  );
  // if one player has 3 or more icons, and it matches a winning array, declare winner.
  if ( oneArray.length >= 3 && compareToWinningArrays(oneArray) ) {
      return declareWinner('Ones');
  } else if 
      ( zeroArray.length >= 3 && compareToWinningArrays(zeroArray) ) {
      return declareWinner('Zeros');
  } else if 
      ( oneArray.length + zeroArray.length === 9 ) {
      return declareWinner('Nobody');
  }
}

let winCode = null;



const compareToWinningArrays = (playerArray) => {
  let final = false;
  winningArrays.forEach(
      (combo) => {
          let outcome = true;
          for(let i = 0; i < 3; i++) {
              if ( playerArray.indexOf(combo[i]) === -1 )
                  return outcome = false;
          }
          if ( outcome ) {
              winCode = combo;
              return final = true;
          }
      } 
  )
  if ( final ) return true;
}

const winningArrays =[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]]

//declare winner

const declareWinner = (win) => {
  playerTurn.innerText = `${win} wins!`;
  if (win === 'Zeros') {
    zeroWins++
    localStorage.setItem("zeroWinsLocal", zeroWins)
    zeroTotal.innerText = zeroWins
  }
  if (win === 'Ones') {
    oneWins++
    localStorage.setItem("oneWinsLocal", oneWins)
    oneTotal.innerText = oneWins
  }
  if(win !== "Nobody") {
    gameWon = true;
    inst.innerText = 'yay! - Press the reset button to play again';
    bkg.style.background = "url('img/binary-battle-winner.webp') rgba(50, 50, 50, 1)"
    bkg.style.backgroundBlendMode = "multiply"
  }
  else {
    inst.innerText = 'This is what happens when an irresistible force meets an immovable object';
  }
  highlight();
};

// highlight winning combo boxes:
const highlight = () => {
  if (winCode) {
      for(let i = 0; i < 3; i++) {
          let id = `${winCode[i]}`;
          const square = document.getElementById(id);
          square.style.background = "chocolate";
      } 
  }
}

// Empty local storage and refresh pages to reset scores

const scoreReset = () => {
  localStorage.clear()
  location.reload()
}

scoresToZero.addEventListener('click', scoreReset)



