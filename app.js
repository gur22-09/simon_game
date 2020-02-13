const buttonColors = ['red','blue','green','yellow'];
let gameStarted =true ;
let level = 0;

let userClickedPattern = [];
const gamePattern = [];




//var sound = new Audio('sounds/'+randomChosenColor+'.mp3');
//console.log(randomChosenColor);



//console.log(gamePattern);

    $(document).keydown(function(){
        
        if(gameStarted){
            $('#level-title').text('level 0');
            nextSequence();
            gameStarted = false;

        }
        
        
      
        
      
      });



$('.btn').on('click',function(){
    //selecting user clicked pattern
    let userChoosenColor = $(this).attr('id');
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    

    //checking if user pattern is similar to game pattern
    checkPattern(userClickedPattern.length-1);
    
    
});





function nextSequence(){

     //once the nextsequence is triggered reset the userClicked pattern array to empty.
     userClickedPattern = [];
    

    //genreating a random number
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
     
    //adding player pattern
    gamePattern.push(randomChosenColor);

    //visual affect and sound
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

   
   

    //increasing level everytime function is called

    level += 1;
    $('h1').html('level '+level);
    
   
    

    
    
}



function playSound(color){
    let sound = new Audio('sounds/'+color+'.mp3');
    sound.play();
}


function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){$('#'+currentColor).removeClass('pressed')},100);
}



function checkPattern(level){
    if(gamePattern[level] === userClickedPattern[level])
    {
        console.log('right');
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log('Wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },1000) ;
        $('#level-title').text('Game Over. Press any key to Continue Again');
        gameStarted = true;
    }
}



