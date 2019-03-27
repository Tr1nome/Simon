var sonVert = new Audio("sounds/mais.wav");
var sonRed = new Audio("sounds/vous.wav");
var sonYellow = new Audio("sounds/fumez.wav");
var sonBlue = new Audio("sounds/monsieur.wav");
var compChoice = ["green","red","blue","yellow"];
var choixOrdiDef = [];
var choixPlayer = [];
var choixOrdi;



function green(){

    sonVert.play();
    $("#green").attr("src","images/l_green.png");
    setTimeout(function(){
        $("#green").attr("src","images/green.png");
    },100);
    choixPlayer.push("green");
}
function red(){

    sonRed.play();
    $("#red").attr("src","images/l_red.png");
    setTimeout(function(){
        $("#red").attr("src","images/red.png");
    },100);
    choixPlayer.push("red");
    
}
function yellow(){

    sonBlue.play();
    $("#yellow").attr("src","images/l_yellow.png");
    setTimeout(function(){
        $("#yellow").attr("src","images/yellow.png");
    },100);
    choixPlayer.push("yellow");
}
function blue(){

    sonYellow.play();
    $("#blue").attr("src","images/l_blue.png");
    setTimeout(function(){
        $("#blue").attr("src","images/blue.png");
    },100);
    choixPlayer.push("blue");
}





$(document).ready(function(){


    $("#go").click(function(){

        choixOrdi = Math.floor(Math.random()* compChoice.length);
        console.log(choixOrdi);
        choixOrdiDef.push(choixOrdi);

        if(choixOrdi == 0){

            green();
            choixOrdiDef.push("green");
        }
        else if(choixOrdi == 1){

            red();
            choixOrdiDef.push("red");
        }
        else if(choixOrdi == 2){

            blue();
            choixOrdiDef.push("blue");
        }
        else if(choixOrdi == 3){

            yellow();
            choixOrdiDef.push("yellow");
        }

    })

   








   
    


});