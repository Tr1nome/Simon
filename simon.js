var greenAudio,redAudio,blueAudio,yellowAudio,buttons,cpuTab,playerTab,number,count,round,speed;

function init(){

greenAudio = new Audio("sounds/son1.mp3");
greenAudio = new Audio("sounds/son2.mp3");
greenAudio = new Audio("sounds/son3.mp3");
greenAudio = new Audio("sounds/son4.mp3");

}

function startGame(){
    
    
    

}

function check(){



}

$(document).ready(function(){


    $("#go").click(function(){
    
    //Le bouton devient vert et on desactive le bouton jouer
    console.log("starting game...");
    $("#go").css("background-color","green").attr("disabled",true);
    });
    
    //Bouton vert
    $("#green").mousemove(function(){
    
    console.log("hovering green button");
    
    })


})