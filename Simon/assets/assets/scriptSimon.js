var blueSound = new Audio("sounds/son1.mp3");
var greenSound = new Audio("sounds/son2.mp3");
var redSound = new Audio("sounds/son3.mp3");
var yellowSound = new Audio("sounds/son4.mp3");
var loseSound = new Audio("sounds/lose.mp3");
var green,red,yellow,blue,touches,randomTab,playerTab,number,count,round;


function awake(){

	green = $("#green");
	red = $("#red");
	yellow = $(".yellow");
	blue = $("#blue");
	touches = $(".input");


	randomTab = [];
	playerTab =[];
	number = 0;
	count = null;
	round = 0;

}

function startGame(){

	number = 0;
	$(".input").css("pointer-events","none");
	$("#go").disabled = true;
	randomize(randomTab);
	createTimer(randomTab);
}

	function randomize(tab){
	var random = Math.ceil(Math.random()*4);
	tab.push(random);
	return tab;

}
var i = 0;

function createTimer(tab){
	i=0;
	number = 0;
	playerTab =[];
	var timer = setInterval(function(){
		var index = tab[i];
		swapImage(tab, index)
		i+=1;
		if (i == tab.length){
			clearInterval(timer)
			var time = 2*tab.length;
			count = setInterval(function(){
				$(".countdown").text(time);
				time--;
				if (time == -1){
					clearInterval(count)
					lose("noTime");
				}
			},1000);
	$(".input").css("pointer-events","auto");
		 }
	},1000);
	
}

function swapImage(tab, index){
	if (index == 1){
		console.log("ordi choisi vert !");
		$("#green").attr("src","./images/l_green.png");
		greenSound.play()
		setTimeout(function(){
		$("#green").attr("src","./images/green.png");
	},300);
	}
	if (index == 2){
		console.log("ordi choisi rouge !");
		$("#red").attr("src","images/l_red.png")
		redSound.play()
		setTimeout(function(){
		$("#red").attr("src","./images/red.png");
	},300);
	}
	if (index == 3){
		console.log("ordi choisi bleu !");
		$("#blue").attr("src","./images/l_blue.png");
		blueSound.play();
		setTimeout(function(){
		$("#blue").attr("src","./images/blue.png");
	},300);
	}
	if (index == 4){
		console.log("ordi choisi jaune !");
		$("#yellow").attr("src","./images/l_yellow.png");
		yellowSound.play();
		setTimeout(function(){
		$("#yellow").attr("src","./images/yellow.png");
	},300);
	}

}

function check(tabCpu, tabPly){
	if(tabCpu[number] != tabPly[number]){
		console.log("perdu")
		lose("wrongChoice");
		
	}
	if (tabPly.length == tabCpu.length && tabCpu[number] == tabPly[number]){
		setTimeout(startGame(), 1000)	
		$(".countdown").html("Manche terminée !");
		round++;
		clearInterval(count)
	}
	else {

		number++;
		console.log("incrément")
	}
		
}

function lose(loseType){
	
	switch (loseType){

		case "noTime": console.log("perdu, faute de temps !");
		loseSound.play();
		$(".lose h1").text("Perdu faute de temps !");
		$(".lose").fadeIn().css("display","flex");
		break;
		
		case "wrongChoice" : console.log("perdu, mauvais bouton !");
		loseSound.play();
		$(".lose h1").text("Perdu mauvais bouton !");
		$(".lose").fadeIn().css("display","flex");
		$(".lose p span").text(round);
		clearInterval(count);
		break;

		default : console.log("perdu");
		}
	
	$(".lose .ok").click(function(){
		$(".lose").fadeOut();
		$("#go").attr("disabled",false);
		time = 0;
		$(".countdown").text(time);
		awake();
		startGame();
	});
	
}


$ (document).ready(function(){

	$("#go").click(function(){

		startGame();
	});

	$("#green").mousedown(function(){
		greenSound.play();
		$("#green").attr("src","images/l_green.png");
		playerTab.push(1);
		check(randomTab, playerTab);
		console.log("joueur choisi vert !");
		setTimeout(function(){
		$("#green").attr("src", "images/green.png");	
		},greenSound.duration*1000);
	})
	
	$("#red").mousedown(function(){
		redSound.play();
		$("#red").attr("src","images/l_red.png");
		playerTab.push(2);
		check(randomTab, playerTab);
		console.log("joueur choisi rouge !");
		setTimeout(function(){
		$("#red").attr("src","images/red.png");
		},redSound.duration*1000);
	})
	
		
	
	$("#blue").mousedown(function(){
		blueSound.play();
		$("#blue").attr("src","images/l_blue.png");
		playerTab.push(3);
		check(randomTab, playerTab);
		console.log("joueur choisi bleu !");
		setTimeout(function(){
		$("#blue").attr("src","images/blue.png");
		},blueSound.duration*1000);
	})
	
	$("#yellow").mousedown(function(){
		yellowSound.play();
		$("#yellow").attr("src","images/l_yellow.png");
		playerTab.push(4);
		check(randomTab, playerTab);
		console.log("joueur choisi jaune !");
		setTimeout(function(){
		$("#yellow").attr("src","images/yellow.png");
		},yellowSound.duration*1000);
	})
	

	awake();



})