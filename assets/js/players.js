export class Player{
    name;
    score;
    round;
    isPlaying;
    sideDice;
    sound=false;
    constructor(name,score,round,isPlaying){
        this.name=name;
        this.score=score;
        this.round=round;
        this.isPlaying=isPlaying;
    }
    rolldie(){
        this.sideDice=Math.floor(Math.random() * 6) + 1;
        if(this.sideDice===1){
            if (this.sound===true) {
                const audio = new Audio('./assets/sounds/loosersound.wav');
                audio.play()
                }
            this.isPlaying=false;
        }
        this.round=this.sideDice>1?this.round+this.sideDice:0;
    }
    validateRound(){
        if(this.score+this.round>=100){
            this.score=100;
        }else{
            this.score+=this.round;
        }
        this.round=0;
        this.isPlaying=false;
    }

}