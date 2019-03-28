var blueSound = new Audio("sounds/son1.mp3");
var greenSound = new Audio("sounds/son2.mp3");
var redSound = new Audio("sounds/son3.mp3");
var yellowSound = new Audio("sounds/son4.mp3");
var green = $("#green");
var red = $("#red");
var yellow = $(".yellow");
var blue = $("#blue");
var touches = $(".input");


var randomTab = [];
var playerTab =[];
var number = 0;
var count = null;


function startGame(){

	var inputs = $(".input");
	number = 0;
	for(var j = 0; j< inputs.length; j++){
		inputs[j].disabled = true;
		}
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
		++i;
		if (i == tab.length){
			clearInterval(timer)
			var time = 2*tab.length;
			count = setInterval(function(){
				$(".countdown").html(time);
				time--;
				if (time == -1){
					clearInterval(count)
					lose()
				}
			},1000);;
	for(var j = 0; j< touches.length; j++){
		touches[j].disabled = false;
			}
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
	},500);
	}
	if (index == 2){
		console.log("ordi choisi rouge !");
		$("#red").attr("src","images/l_red.png")
		redSound.play()
		setTimeout(function(){
		$("#red").attr("src","./images/red.png");
	},500);
	}
	if (index == 3){
		console.log("ordi choisi bleu !");
		$("#blue").attr("src","./images/l_blue.png");
		blueSound.play();
		setTimeout(function(){
		$("#blue").attr("src","./images/blue.png");
	},500);
	}
	if (index == 4){
		console.log("ordi choisi jaune !");
		$("#yellow").attr("src","./images/l_yellow.png");
		yellowSound.play();
		setTimeout(function(){
		$("#yellow").attr("src","./images/yellow.png");
	},500);
	}

}

function check(tabC, tabP){
	if(tabC[number] != tabP[number]){
		console.log("perdu")
		lose();
		
	}
	if (tabP.length == tabC.length && tabC[number] == tabP[number]){
		setTimeout(startGame(), 2000)	
		$(".countdown").html("Manche terminée !");
		clearInterval(count)
	}
	else {

		number++;
		console.log("incrément")
	}
		
}

function lose(){
	
	var btn = document.createElement('btn');
	document.body.appendChild(btn);
	btn.setAttribute('style','border: solid; background: white; cursor: pointer;');
	btn.innerHTML= "Relance ?";
	btn.onclick = function(){
		btn.remove();
		$("#go").attr("disabled",false);
	}
	randomTab =[];
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
	})
	$("#green").mouseup(function(){
		$("#green").attr("src","images/green.png");
	})
	$("#red").mousedown(function(){
		redSound.play();
		$("#red").attr("src","images/l_red.png");
		playerTab.push(2);
		check(randomTab, playerTab);
		console.log("joueur choisi rouge !");
	})
	$("#red").mouseup(function(){
		$("#red").attr("src","images/red.png");
	})
	$("#blue").mousedown(function(){
		blueSound.play();
		$("#blue").attr("src","images/l_blue.png");
		playerTab.push(3);
		check(randomTab, playerTab);
		console.log("joueur choisi bleu !");
	})
	$("#blue").mouseup(function(){
		$("#blue").attr("src","images/blue.png");
	})
	$("#yellow").mousedown(function(){
		yellowSound.play();
		$("#yellow").attr("src","images/l_yellow.png");
		playerTab.push(4);
		check(randomTab, playerTab);
		console.log("joueur choisi jaune !");
	})
	$("#yellow").mouseup(function(){
		$("#yellow").attr("src","images/yellow.png");
	})

	


})