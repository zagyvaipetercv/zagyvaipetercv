//Challenge 1:

var birthDayButton = document.getElementById("birthDayButton");
var birthDayReset = document.getElementById("birthDayReset");
var ageResult = document.getElementById("ageResult");
var ageInDays;


birthDayButton.addEventListener("click", ageCalculator);
birthDayReset.addEventListener("click", resetAge)

function ageCalculator(){
    var birthDates = prompt("When were you born? (dd.mm.yyyy)");
    var birthYear = parseInt(birthDates.split('.')[2]);
    var birthMonth = parseInt(birthDates.split('.')[1]);
    var birthDay = parseInt(birthDates.split('.')[0]);
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var currentDay = new Date().getDate();
    var monthDifference = currentMonth-birthMonth;
    var dayDifference = currentDay-birthDay;
    var ageInYears = currentYear-birthYear;
    var missedDays = parseInt(ageInYears/4);

    ageInDays = ageInYears*365 + missedDays + monthDifference*30 + dayDifference;

    if(currentYear > birthYear){
        ageResult.innerHTML = 'Your age in days is: <br/>' + ageInDays;
    }
    else if(currentYear < birthYear){
        alert("Invalid Birthdate");
        ageCalculator();
    }
}

function resetAge(){
    ageResult.innerHTML = '';
}


//Challenge 2:

var catGeneratorButton = document.getElementById("catGeneratorButton");
var generatedCatsList = document.getElementById("generatedCatsList");

catGeneratorButton.addEventListener('click', generateCats);

function generateCats(){
    generatedCatsList.innerHTML += '<li><img src="img/turtle_challenge_2.jpg" width="100px" alt=""></li>';
}

//Challenge 3:

var rpsStart;
var rpsResult;

function rpsGame(yourChoice){

    rpsStart = document.getElementById("rpsStart");
    rpsResult = document.getElementById("rpsResult");
    rpsStart.classList.add("hide");
    rpsResult.classList.remove("hide");

    //Bot choice
    var rnd = Math.floor(Math.random()*3);
    var rndString = ['rock', 'paper', 'scissors'];

    /* REWORKED
    switch(rnd){
        case 0:
            rndString = "rock";    
        break;
        case 1:
            rndString = "paper";    
        break;
        case 2:
            rndString = "scissors";    
        break;
    }
    */


    var resultOfGame;
     switch(yourChoice.id){
        case "rock":
            switch(rndString[rnd]){
                case "rock":
                    resultOfGame = "tie";
                break;
                case "scissors":
                    resultOfGame = "won";
                break;
                case "paper":
                    resultOfGame = "lost";
                break;
            }        
        break;
        case "paper":
            switch(rndString[rnd]){
                case "rock":
                    resultOfGame = "won";
                break;
                case "scissors":
                    resultOfGame = "lost";
                break;
                case "paper":
                    resultOfGame = "tie";
                break;
            }        
        break;
        case "scissors":
            switch(rndString[rnd]){
                case "rock":
                    resultOfGame = "lost";
                break;
                case "scissors":
                    resultOfGame = "tie";
                break;
                case "paper":
                    resultOfGame = "won";
                break;
            }        
        break;
    }

    rpsResult.innerHTML += '<img src="img/'+ yourChoice.id +'.png">';
    rpsResult.innerHTML += '<h1></h1>';
    rpsResult.innerHTML += '<img src="img/'+ rndString[rnd] +'.png">';
    rpsResult.innerHTML += "<div class='rpsRestartButton'><button id='rpsRestart' onclick='resetRps()'>Restart</button></div>";  
    rpsResult.style.padding = "20px 0"
    switch(resultOfGame){
        case "won":
            rpsResult.children[0].classList.add("rpsWinner");
            rpsResult.children[1].textContent="You Won!";
            rpsResult.children[2].classList.add("rpsLoser");
        break;
        case "tie":
            rpsResult.children[0].classList.add("rpsTie");
            rpsResult.children[1].textContent="Draw!";
            rpsResult.children[2].classList.add("rpsTie");
        break;
        case "lost":
            rpsResult.children[0].classList.add("rpsLoser");
            rpsResult.children[1].textContent="You Lost!";
            rpsResult.children[2].classList.add("rpsWinner");
        break;
    }
}

function resetRps(){
    rpsStart.classList.remove("hide");
    rpsResult.innerHTML = "";
    rpsResult.style.padding = 0;
}

//Challenge 4:
var colorChangedAlready = false;
const defaultColors = [];

function buttonColorChange(select){

    var buttonsChallenge4 = select.parentElement.parentElement.getElementsByTagName("button");
    
    //saves default colors
    if (colorChangedAlready == false){
        for (let i = 0; i < buttonsChallenge4.length; i++) {
            defaultColors[i] = buttonsChallenge4[i].style.backgroundColor;
        }
        colorChangedAlready = true;
    }

    colorChanger(select.value, buttonsChallenge4);
}

function colorChanger(colorSelected, buttons){
    switch(colorSelected){
        case "default":
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.backgroundColor = defaultColors[i];
            }
        break;

        case "random":
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.backgroundColor = rndColorSelector();
            }
        break;

        default:
            for (let i=0; i<buttons.length; i++){
                buttons[i].style.backgroundColor = colorSelected;
            }
        break;
    }
}

function rndColorSelector(){
    var rndColorR = Math.floor(Math.random()*255);
    var rndColorG = Math.floor(Math.random()*255);
    var rndColorB = Math.floor(Math.random()*255);

    //rgb(255, 55, 55) <-- just a reference

    var rndColor= 'rgb('+rndColorR+', '+rndColorG+', '+rndColorB+')'

    return rndColor;
}

//challenge 5:


/*object that has src, name, number, serial-number
when pulled from the deck use serial number
*/

//SFX
var dealingCardsSFX = new Audio('sounds/cards/dealing_cards.wav');
var losingSFX = new Audio('sounds/cards/losing_sfx.wav');
losingSFX.volume = 0.2;
var winningSFX = new Audio('sounds/cards/winning_sfx.wav');
var drawSFX  =new Audio('sounds/cards/draw_sfx.mp3');

//DIVS
var mainDivBJ = document.getElementById('blackjack');
var bjTableWins = document.getElementById('bjWins');
var bjTableLosses = document.getElementById('bjLosses');
var bjTableDraws = document.getElementById('bjDraws');
var playerSide = document.getElementsByClassName('bj-left')[0];
var dealerSide = document.getElementsByClassName('bj-right')[0];

//BUTTONS
var hitButton = document.getElementById('bjHit');
var standButton = document.getElementById('bjStand');
var dealButton = document.getElementById('bjDeal');

//VARIABLES
var cardsAvailable = [];
resetCards();

var cardsAnimation = [];
var cardsTakenSrc = [];
var cardsTakenValue = [];
var cardCounter = 0; 

var playerSumValue = 0;
var dealerSumValue = 0;

var bjWins = 0;
var bjLosses = 0;
var bjDraws = 0;

var alreadyLost = false;
var playersTurn = true;
var gameEnded = false;

//BUTTON EVENTS
dealButton.addEventListener('click', resetCards);
hitButton.addEventListener('click', playerSideGame);
standButton.addEventListener('click', dealerSideGame);

//ACCESING CARDS.JSON
var cards = [];

fetch('./cards.json')
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        cards = data;
    }
);

function dealerSideGame(){
    if(!gameEnded){
        playersTurn = false;
        /*
        while (dealerSumValue < 16 && dealerSumValue <= playerSumValue){
            takingCard();
            drawingCards();
        }
        */
       if(dealerSumValue < 17 && dealerSumValue <= playerSumValue){
           setTimeout(function(){
           takingCard();
           drawingCards();
           dealerSideGame();
           },750);
       }
       else{
           decidingWinner();
       }
    }
}

function decidingWinner(){
    if(dealerSumValue < playerSumValue || dealerSumValue > 21){
        winningBJ();
    }
    else if (dealerSumValue == playerSumValue){
       drawBJ();
    }
    else{
        losingBJ();
    }
}

function playerSideGame(){
    if(alreadyLost == false && playersTurn){
        takingCard();
        drawingCards();
        if(playerSumValue > 21){
            losingBJ();
        }
    }
}

function drawBJ(){
    mainDivBJ.children[1].innerHTML = 'Draw!';
    bjDraws++;
    bjTableDraws.innerHTML = bjDraws;
    gameEnded = true;
    drawSFX.play();
}

function winningBJ(){
    mainDivBJ.children[1].innerHTML = 'You won!';
    mainDivBJ.children[1].style.color = 'green';
    bjWins++;
    bjTableWins.innerHTML = bjWins;
    gameEnded = true;
    winningSFX.play();
}

function losingBJ(){
    mainDivBJ.children[1].style.color= 'red';
    mainDivBJ.children[1].innerHTML = 'You lost!'
    bjLosses++;
    bjTableLosses.innerHTML = bjLosses;
    alreadyLost = true;
    gameEnded = true;
    losingSFX.play();
}



function drawingCards(){
    if(playersTurn){
        playerSide.innerHTML += '<img class="cards" src=' +cardsTakenSrc[cardCounter-1]+'>';
    }
    else{
        dealerSide.innerHTML += '<img class="cards" src=' +cardsTakenSrc[cardCounter-1]+'>';
    }
    var cardsToAnimate = document.getElementsByClassName('cards');
    if (cardCounter > 1){
        cardsToAnimate[cardCounter-2].style.animationName = '';
    }
    cardsToAnimate[cardCounter-1].style.animationName = 'cardAnimation';
    dealingCardsSFX.play();
}

function takingCard(whichSide, whichValue){
    if(cardCounter < 52){
        var rnd = Math.floor(Math.random()*52);
        if(cardsAvailable[rnd]){
            //checks if cards are still available
            cardsAvailable[rnd] = false;
            cardsTakenSrc[cardCounter] = 'img/cards/' + cards[rnd].name + '.jpg';
            cardsTakenValue[cardCounter] = cards[rnd].value;
            if(playersTurn){
                playerSumValue += cardsTakenValue[cardCounter];
                playerSide.children[0].innerHTML = 'You: ' + playerSumValue;
            }
            else{
                dealerSumValue += cardsTakenValue[cardCounter];
                dealerSide.children[0].innerHTML = 'Dealer: ' + dealerSumValue;
            }
            //console.log(cards[rnd].name);
            cardCounter++;
        }
        else{
            takingCard();
        }
    }
}

function resetCards(){
    for (let i = 0; i < 52; i++) {
        cardsAvailable[i] = true;
    }
    cardsTakenSrc = [];
    cardsTakenValue = [];
    cardCounter = 0; 

    playerSumValue = 0;
    dealerSumValue = 0;

    alreadyLost = false;
    playersTurn = true;
    gameEnded = false;

    mainDivBJ.children[1].style.color= 'black';
    mainDivBJ.children[1].innerHTML = "Let's play!";
    playerSide.innerHTML = '<h3>You: 0</h3>';
    dealerSide.innerHTML = '<h3>Dealer: 0</h3>';

    audioStop(losingSFX);
    audioStop(winningSFX);
    audioStop(drawSFX);
}

function audioStop(audio){
    audio.pause();
    audio.currentTime = 0;
}




