import {Player} from "./assets/js/players.js";
// btn Newgame
const btnNewGame=document.querySelector('#newGame');
//btn sound
const btnSound=document.querySelector('#sound');
const soundFaicon=document.querySelector('#sound i')
//btn dice
const btnRoll=document.querySelector('#roll');
const btnhold=document.querySelector('#hold');
//img dice
let imgDice=document.querySelector('#dice');

// global scores
const globalFirstPlayer=document.querySelector('#globalFirstPlayer');
const globalSecondPlayer=document.querySelector('#globalSecondPlayer');
// round scores
const roundFirstPlayer=document.querySelector('#roundFirstPlayer');
const roundSecondPlayer=document.querySelector('#roundSecondPlayer');

//progress bar players
const progressFirstPlayer=document.querySelector('#progressFirstPlayer');
const progressSecondPlayer=document.querySelector('#progressSecondPlayer');
// card player
const cardPlayer1=document.querySelector('.card-player1');
const cardPlayer2=document.querySelector('.card-player2');
//players
let playeur1;
let playeur2;
//sound
let sound=false;
//game
let gameStart=false;
const gameScoreMax=100;

function checkGameState(){
    if(gameStart===false){
        btnRoll.disabled=true;
        btnhold.disabled=true;
    }else{
        btnRoll.disabled=false;
        btnhold.disabled=false;
    }
}
function removeWinerClass(){
    if(cardPlayer1.classList.contains('winer')){
        cardPlayer1.classList.remove('winer')
    }
    if(cardPlayer2.classList.contains('winer')){
        cardPlayer2.classList.remove('winer')
    }
}
function newGame(){
    if (sound===true) {
        const audio = new Audio('./assets/sounds/carLoading.mp3');
        audio.play()
        }
    playeur1=new Player('playeur1',0,0,true)
    playeur2=new Player('playeur2',0,0,false)
    globalFirstPlayer.innerText=playeur1.score;
    globalSecondPlayer.innerText=playeur2.score;
    roundFirstPlayer.innerText=playeur1.round;
    roundSecondPlayer.innerText=playeur2.round;
    removeWinerClass();
    if(cardPlayer1.classList.contains('opacity-25')){
        cardPlayer1.classList.toggle('opacity-25');
    }
    if(!cardPlayer2.classList.contains('opacity-25')){
        cardPlayer2.classList.toggle('opacity-25');
    }
    progressFirstPlayer.style.width=`${playeur1.score}%`;
    progressSecondPlayer.style.width=`${playeur2.score}%`;
   
}
function checkWiner(score1,score2){
    if(score1>=gameScoreMax || score2>=gameScoreMax){
        gameStart=false;
        if(score1>score2){
            cardPlayer1.classList.add('winer')
            setTimeout(()=>{
                alert('Partie terminé : le Joueur 1 remporte la course\nCliquez sur Nouveaux jeux pour lancer une nouvelle partie')
                removeWinerClass();
            },1000);
            
        }else if(score2>score1){
            cardPlayer2.classList.add('winer')
            setTimeout(()=>{
                alert('Partie terminé : le Joueur 2 remporte la course\nCliquez sur Nouveaux jeux pour lancer une nouvelle partie')
                removeWinerClass();
            },1000);  
        }    
    }
    checkGameState();
}
btnSound.addEventListener('click',(e)=>{
    if(soundFaicon.classList.contains('fa-volume-mute')){
        soundFaicon.classList.remove('fa-volume-mute');
        soundFaicon.classList.add('fa-volume-up');
        sound=true;
        playeur1.sound=true;
        playeur2.sound=true;
        if (sound=true) {
            const audio = new Audio('./assets/sounds/holdsong.mp3');
            audio.play()
            }

    }else if(soundFaicon.classList.contains('fa-volume-up')){
        soundFaicon.classList.remove('fa-volume-up');
        soundFaicon.classList.add('fa-volume-mute');
        sound=false;
        playeur1.sound=false;
        playeur2.sound=false;
    }
})

btnNewGame.addEventListener('click',(e)=>{
    gameStart=true;
    newGame();
    checkGameState();
})
btnRoll.addEventListener('click',(e)=>
{
    if (sound===true) {
        const audio = new Audio('./assets/sounds/Dice sound.mp3');
        audio.play()
        }
    let faceDisplay;
    if(gameStart && (playeur1.score<=gameScoreMax || playeur2.score<=gameScoreMax))
    {
        if(playeur1.isPlaying===true && playeur2.isPlaying===false)
        {
            playeur1.rolldie();
            faceDisplay=playeur1.sideDice;
            roundFirstPlayer.innerText=playeur1.round;
            if(playeur1.isPlaying===false){
                playeur2.isPlaying=true;
                if(playeur1.score<100){
                    cardPlayer1.classList.toggle('opacity-25');
                }
                cardPlayer2.classList.toggle('opacity-25');
            }
            
        } 
        else if(playeur2.isPlaying===true && playeur1.isPlaying===false)
        {
            playeur2.rolldie();
            faceDisplay=playeur2.sideDice;
            roundSecondPlayer.innerText=playeur2.round;
            if(playeur2.isPlaying===false){
                playeur1.isPlaying=true;
                if(playeur2.score<100){
                    cardPlayer2.classList.toggle('opacity-25');
                }
                cardPlayer1.classList.toggle('opacity-25');      
            }
        }
            
    }
    checkWiner(playeur1.score,playeur2.score2);
    imgDice.src=`assets/img/dice/${faceDisplay}.svg`
    });
btnhold.addEventListener('click',()=>{
    if (sound===true) {
        const audio = new Audio('./assets/sounds/holdsong.mp3');
        audio.play()
        }
    if(playeur1.isPlaying){
        playeur1.validateRound();
        globalFirstPlayer.innerText=playeur1.score;
        roundFirstPlayer.innerText=playeur1.round;
        progressFirstPlayer.style.width=`${playeur1.score}%`;
        checkWiner(playeur1.score,playeur2.score);
        playeur1.isPlaying=false;
        playeur2.isPlaying=true;
        cardPlayer2.classList.toggle('opacity-25');
        cardPlayer1.classList.toggle('opacity-25');
    }else if(playeur2.isPlaying){
        playeur2.validateRound();
        globalSecondPlayer.innerText=playeur2.score;
        roundSecondPlayer.innerText=playeur2.round;
        progressSecondPlayer.style.width=`${playeur2.score}%`;
        checkWiner(playeur1.score,playeur2.score);
        playeur1.isPlaying=true;
        playeur2.isPlaying=false;
        cardPlayer2.classList.toggle('opacity-25');
        cardPlayer1.classList.toggle('opacity-25');
    }
})
