class Enemy {

    constructor(xAxes,yAxes) {
        //Loading the image 
        this.sprite = 'images/enemy-bug.png';
        //Setting the Enemy initial location
        this.x = xAxes ;
        this.y = yAxes ;
        //Setting the Enemy speed 
        this.speed = Math.floor(Math.random() * 3 + 2);
        }
    
    // Parameter: dt, a time delta between ticks
    update(dt) { 
        // Updating the Enemy location
        this.x += this.speed;
        if(this.x > 500) {
            this.x = 0;
        }
    }

    // Drawing the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
    }

class Player {

    constructor(){
        //Loading the image
        this.sprite = 'images/char-boy.png';
        //Setting the Player initial location
        this.x = 200;
        this.y = 400;
    }
    
    //checking if the player interfers with the enemy
    update(){
        checkCollisions();
    }
    
    // Drawing the player on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //setting the Player back to the initial location
    reset(){
        this.x = 200;
        this.y = 400;
    }
    
    //asking the user if he wants to play again
    playAgain(){
        this.y -= 85;
        setTimeout(function(){
        let wantsToPlayAgain = window.confirm('You won! would you like to play again?');
            if(wantsToPlayAgain){
                player.reset(); } },300);
    }    


    handleInput(move){
        switch (move){ 
            case'up':
                if (this.y > 60){
                    this.y -= 85;
                }else if (this.y <= 60){
                    this.playAgain();
                 }; 
                break;
            case'down':
                if (this.y <= 315){
                this.y += 85;}
                break;
            case 'left':
                if (this.x >= 100){
                this.x -= 100;}
                break;
            case 'right':
                if (this.x <= 300){
                this.x += 100;}
                break;
        }
    }

    
}
   


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy(0,70),
                    new Enemy(100,150),
                    new Enemy(200,230)];

// Place the player object in a variable called player        
const player = new Player();

//reset the game If the player collades with the enemy
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++){    
        if (allEnemies[i].x + 100 > player.x  
            && allEnemies[i].x < player.x + 50 
            && allEnemies[i].y + 40 > player.y 
            && allEnemies[i].y < player.y + 40)
        {
            setTimeout(function(){
            player.reset();},100); 
        }
    }
}

 // This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

