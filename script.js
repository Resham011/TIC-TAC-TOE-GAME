const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// FUNCTION TO INITIALIZATION OF THE GAME

function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI PAR BHI TO EMPTY KARNA HOGA NA 
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // also remove the background  color jo tab ata hia jab koi win karta hai 
        // COLOR REMOVE KARNE KE LIYE HAME BOX KI INITIAL CSS PROPERTIES TO SET KARNA HOGA 
        box.classList = `box box${index + 1}`;

    })
    newGameBtn.classList.remove("active");
    // CURLY BRAKETS KE ANDAR OBJECT LITERALS KO DAL DO TO JAB HAMARE VALUE CHNAGE HOGI USE ACCORDINGLY CHANGE KAR SAKTE HAI 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});    

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // turns swap karo 
        swapTurn();
        // Check is someone wins
        checkGameOver();

    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    // ui par bhi player ko chnage show karo top par \
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

function checkGameOver(){
    let answer = "";
    // ALL THE BOXES MUST BE NON EMPTY AND SHOULD HAVE SAME VALUE
    winningPositions.forEach((position) => {
        //  HAR POSITION PAR ITERATE KARNE HAI OR CHECK KARNA HAI KI HAI KOI WIN TO NHI KAR RAHA 
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

                // check if x wins or O
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }

                // AB HAME FURTHER GAME ME KOI CHNAGE NHI KARNA HIA MATLAB KI AB TIC TAC TOE PAR KOI BHI CLICK NHI HONA CHAHIYE 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // AB WINNER PATA HAI TO BACKGROUND ME COLOR ADDD KAR DO 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // WINNER MILA 
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    // CHECK WEATHER ITS A TIE
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });
    // BOARD IS FILLED  GAME IS TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tie !";
        newGameBtn.classList.add("active");
    }

    // ELSE ABHI HAMARA GAME CONTINUE HAI 

};