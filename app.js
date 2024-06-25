const rock = document.getElementById ('buttonRock')
const papers = document.getElementById ('buttonPapers')
const scissors = document.getElementById ('buttomScissors')
const userImg = document.getElementById ('user')
const machineImg = document.getElementById ('machine')
const resultText = document.getElementById ('Result')
const scoreUser = document.getElementById ('userScore')
const machineScore = document.getElementById ('machineScore')
const ReloadGame = document.getElementById ('button')



const ROCK = "rock";
const PAPER = "papers";
const SCISSORS = "scissors";

const TIE = 0;
const WIN = 1;
const LOST = 2;

let isPlaying = false;
let playerScore = 0;
let computerScore = 0;

rock.addEventListener("click", () => {
    play(ROCK);
});
papers.addEventListener("click", () => {
    play(PAPER);
});
scissors.addEventListener("click", () => {
    play(SCISSORS);
});

ReloadGame.addEventListener("click",()=>{
    playerScore = 0;
    computerScore = 0;
    updateScore();
    resultText.innerHTML = "Elige tu jugada";
    userImg.src = "img/rock.png";
    machineImg.src = "img/rock.png";
    isPlaying = false;

})

function play (userOption) {
    if (isPlaying) return;

    isPlaying = true; 

    userImg.src = "img/" + userOption + ".png";

    resultText.innerHTML = "Chossing!";

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "img/" + machineOption + ".png";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResult(userOption, machineOption);

        machineImg.src = "img/" + machineOption + ".png";

        switch (result) {
            case TIE:
                resultText.innerHTML = "You have tied!";
                break;
            case WIN:
                resultText.innerHTML = "You win!";
                playerScore++;
                break;
            case LOST:
                resultText.innerHTML = "You lost!";
                computerScore++;
                break;
        }
        updateScore()
        if (playerScore === 3 ) {
            showFinalResult();
        } else if ( computerScore === 3){
           showFinalResult2();
        } else {
            isPlaying = false;
        }

    }, 2000);

}


function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE;

    } else if (userOption === ROCK) {

        if (machineOption === PAPER) return LOST;
        if (machineOption === SCISSORS) return WIN;

    } else if (userOption === PAPER) {

        if (machineOption === SCISSORS) return LOST;
        if (machineOption === ROCK) return WIN;

    } else if (userOption === SCISSORS) {

        if (machineOption === ROCK) return LOST;
        if (machineOption === PAPER) return WIN;

    }
}

function updateScore (){
    scoreUser.innerText = playerScore;
    machineScore.innerText = computerScore;
}