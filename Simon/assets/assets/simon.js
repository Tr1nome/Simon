var cpu = [];
var player = [];
var colors = ["green","red","yellow","blue"]
var color;
var soundGreen = new Audio("sounds/mais.wav");
var soundRed = new Audio("sounds/vous.wav");
var soundBlue = new Audio("sounds/fumez.wav");
var soundYellow = new Audio("sounds/monsieur.wav");
var speed = 1000;
var inter = null;

function startGame(){

	
	inter = setInterval(randomColor,speed);


}
//Computer
function randomColor(){

	color = Math.floor(Math.random()*colors.length);

	if(color == 0){

		$("#green").attr("src", "images/l_green.png");
		setTimeout(function(){
			$("#green").attr("src", "images/green.png");
		},100)
		soundGreen.play();
		clearInterval(inter);
		cpu.push("green");
		$(".container").css("pointer-events","auto");
		
		
		
		
	}
	else if(color == 1){

		$("#red").attr("src", "images/l_red.png");
		setTimeout(function(){
			$("#red").attr("src", "images/red.png");
		},100)
		soundRed.play();
		clearInterval(inter);
		cpu.push("red");
		$(".container").css("pointer-events","auto");
		
		
		
	}
	else if(color == 2){

		$("#blue").attr("src", "images/l_blue.png");
		setTimeout(function(){
			$("#blue").attr("src", "images/blue.png");
		},100)
		soundBlue.play();
		clearInterval(inter);
		cpu.push("blue");
		$(".container").css("pointer-events","auto");
		
		
		
	}
	else if(color == 3){

		$("#yellow").attr("src", "images/l_yellow.png");
		setTimeout(function(){
			$("#yellow").attr("src", "images/yellow.png");
		},100)
		soundYellow.play();
		clearInterval(inter);
		cpu.push("yellow");
		$(".container").css("pointer-events","auto");
		

	}

	
}

//Player
function player(){



}



$(document).ready(function(){

	$(".container").css("pointer-events","none");

	$("#go").click(function(){
		
		$("#go").attr("disabled",true);

		startGame();

		
	});

	$("#green").click(function(){

		player.push("green");
		$("#go").attr("disabled",false);
		$("#green").attr("src", "images/l_green.png");
		setTimeout(function(){
			$("#green").attr("src", "images/green.png");
		},100)
		soundGreen.play();

	})
	$("#red").click(function(){

		player.push("red");
		$("#go").attr("disabled",false);
		$("#red").attr("src", "images/l_red.png");
		setTimeout(function(){
			$("#red").attr("src", "images/red.png");
		},100)
		soundRed.play();
	})
	$("#blue").click(function(){

		player.push("blue");
		$("#go").attr("disabled",false);
		$("#blue").attr("src", "images/l_blue.png");
		setTimeout(function(){
			$("#blue").attr("src", "images/blue.png");
		},100)
		soundBlue.play();
	})
	$("#yellow").click(function(){

		player.push("yellow");
		$("#go").attr("disabled",false);
		$("#yellow").attr("src", "images/l_yellow.png");
		setTimeout(function(){
			$("#yellow").attr("src", "images/yellow.png");
		},100)
		soundYellow.play();
	})



})