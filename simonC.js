var soundgreen = new Audio("sounds/mais.wav");
var soundRed = new Audio("sounds/vous.wav");
var soundYellow = new Audio("sounds/fumez.wav");
var soundBlue = new Audio("sounds/monsieur.wav");
var choixOrdiDef = [];
var choixPlayerDef= [];
var choixOrdi;
var i;


$(document).ready(function(){

	function green(){
		soundgreen.play();
		$("#green").attr("src","images/l_green.png");
		setTimeout(function(){
			$("#green").attr("src","images/green.png");
		},100);
	}

	function red(){
		soundRed.play();
		$("#red").attr("src","images/l_red.png");
		setTimeout(function(){
			$("#red").attr("src","images/red.png");
		},100);
	}

	function yellow(){
		soundYellow.play();
		$("#yellow").attr("src","images/l_yellow.png");
		setTimeout(function(){
			$("#yellow").attr("src","images/yellow.png");
		},100);
	}

	function blue(){
		soundBlue.play();
		$("#blue").attr("src","images/l_blue.png");
		setTimeout(function(){
			$("#blue").attr("src","images/blue.png");
		},100);
	}



	$('#green').click(function(){
		choixPlayerDef.push(1);
		green();
		compare(choixPlayerDef, choixOrdiDef);
	});

	$('#red').click(function(){
		choixPlayerDef.push(2);
		red();
		compare(choixPlayerDef, choixOrdiDef);
	});

	$('#yellow').click(function(){
		choixPlayerDef.push(3);
		yellow();
		compare(choixPlayerDef, choixOrdiDef);
	});

	$('#blue').click(function() {
		choixPlayerDef.push(4);
		blue();
		compare(choixPlayerDef, choixOrdiDef);
	});







	function randomOrdi(choixOrdi, choixOrdiDef){
		choixOrdi = Math.ceil(Math.random()* 4);
		console.log(choixOrdi);
		choixOrdiDef.push(choixOrdi);
		animation(choixOrdiDef);
	}

	function cpuImage(choixOrdi){
		switch (choixOrdi) {
			case 1:
				green();
				break;
			case 2:
				red();
				break;
			case 3:
				yellow();
				break;
			case 4:
				blue();
				break;
		}
	}
	var index=0;

	function animation(choixOrdiDef){
		index=0;
		var compteur= setInterval(function(){
			var valeurT = choixOrdiDef[index];
			cpuImage(valeurT);

			index +=1;
			if( index == choixOrdiDef.length)
			{
				clearInterval(compteur)
			}
		},500);
	}

	function compare(choixPlayerDef, choixOrdiDef){
		i=0;
		if( i= choixOrdiDef.length){

		}
		if(choixPlayerDef[i] == choixOrdiDef[i]) {
			i++
		}
		else {
			console.log ("tu as perdu");
		}

	}

	function newgame(){
		randomOrdi(choixOrdi, choixOrdiDef);

	}

	$('#go').click(function(){
		newgame();
	})

});