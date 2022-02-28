varArray = ["rock","scissor","paper"];

choicesImages = document.querySelectorAll("img")
text = document.getElementById("gameInfo")
roundText = document.getElementById('actualRound')
let round = 1
notClicked=true;


choicesImages.forEach(item => {
    item.addEventListener('transitionend', e =>{
        if (e.propertyName !== 'transform') return;
        item.classList.remove("imgSelected");
    })
})

choicesImages.forEach(item => {
    item.addEventListener("click", e => {
        item.classList.remove("imgSelected");
        if (notClicked){
            notClicked=false;
            item.classList.add("imgSelected");
            playGame(e);
        }
    })
})

function playGame(input){
    let userChoice = input.target.parentNode.className.toLowerCase();
    let Scores = getScores();
    let computerChoice = computerPlay();
    playRoundGame(userChoice,computerChoice,Scores);
    checkRound(Scores);
}

function computerPlay(){
    computerChoice = varArray[generateRandomNumber(varArray)];
    return computerChoice.toLowerCase();
}

function generateRandomNumber (inputArray){
    arrLength = inputArray.length;
    randomNumber = Math.floor(Math.random()*arrLength);
    return randomNumber;
}

function getScores(){
    scoreUser = Number(document.querySelector(".scoreUser").childNodes.item(1).textContent);
    scoreComputer = Number(document.querySelector(".scoreComputer").childNodes.item(1).textContent);
    return [scoreUser,scoreComputer]
}

function updateScores(Scores){
    document.querySelector(".scoreUser").childNodes.item(1).textContent = Scores[0].toString()
    document.querySelector(".scoreComputer").childNodes.item(1).textContent = Scores[1].toString()
}

function playRoundGame(userChoice,computerChoice,Scores){
    if ((userChoice == "rock" && computerChoice =="scissor") 
         || (userChoice == "paper" && computerChoice =="rock") 
         || (userChoice == "scissor" && computerChoice =="paper")){
             text.innerText=`${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} beats ${computerChoice}! \nCongrats! You've won round ${round}!`;
             Scores[0]++
         } else if (userChoice == computerChoice){
            text.innerText=`You've both chosen ${userChoice}\n Round ${round} is a DRAW!`;
             return;
         } else {
            text.innerText=`${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} loses to ${computerChoice}!\nYou've lost round ${round}! :/`
            Scores[1]++;
         }
}

function checkRound(Scores){
    let remainingRounds = 5 - round;
    if (round===5 || Scores[0]==3 || Scores[1] == 3 || Scores[0] + remainingRounds < Scores[1] ||
        Scores[1]+remainingRounds < Scores[0] ){
        if (Scores[0]>Scores[1]){
            setTimeout(printResults,1000,"user")
            } else if (Scores[0] < Scores[1]){
                setTimeout(printResults,1000,"computer")
            } else{
                setTimeout(printResults,1000,"draw")
        }
    } else {
    updateScores(Scores)
    round++;
    roundText.innerText=`Round: ${round}`
    notClicked=true;
    }
}

function printResults(input){
    switch(input){
        case "user":
        text.innerText="You've won \n Click on a figure if you wish to play again :)";
        break;
        case "computer":
        text.innerText="You've lost \n Click on a figure if you seek revenge! >D";
        break;
        case "draw":
        text.innerText="DRAW!!! \n Click on a figure if you want some closure XD";
        break;
    }
    Scores = [0,0];
    round=1;
    updateScores(Scores)
    roundText.innerText=`Round: ${round}`
    notClicked=true;

}

