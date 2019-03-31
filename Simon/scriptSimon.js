/**
	 * Simon
	 * @author : Leo Souly
	 * @description : Simon game
	 * 		maxRounds : 	@int : determine le nombre de rounds nécessaires pour gagner la partie
	 * 		speed : 		@float  : facteur de vitesse qui influe sur la rapidité d'execution d'une chaine 
	 * 		counter :       @int : renvoie le nombre de manche ecoulées
	 *      canIncrease : 	@bool   : Si vrai alors l'ordi augmente la série d'un bloc, si faux rien ne se passe 
	 * 		
	 * 		
	 */






var buttons = ["red", "blue", "yellow", "green"];						//liste les boutons disponibles
var buttonColors = {red: "assets/images/l_red.png", blue: "assets/images/l_blue.png",
 yellow: "assets/images/l_yellow.png", green: "assets/images/l_green.png"};			//on stock les images cliquées dans un objet
var swapColors = {red: "assets/images/red.png", blue: "assets/images/blue.png",
 yellow: "assets/images/yellow.png", green: "assets/images/green.png"}; 				//Les images de base
var error = new Audio("assets/sounds/error.wav");								//Le son de l'erreur
var victory = new Audio("assets/sounds/victory.mp3");							//Le son de victoire
var click = new Audio("assets/sounds/click.mp3");
var fade = new Audio("assets/sounds/fade.wav");								//Le son du clic
var audio = {
	red: new Audio("assets/sounds/son1.mp3"), 									//Objet contenant les sons pour chaque couleur
	blue: new Audio("assets/sounds/son2.mp3"), 
	yellow: new Audio("assets/sounds/son3.mp3"), 
	green: new Audio("assets/sounds/son4.mp3")
};
var randomTab = [];														//tableau de l'ordi
var playerTab = [];														//tableau du joueur
var counter = 0;														//Compteur de manche
var gameMove;															//Interval
var speed = 1;															//Facteur de vitesse pour augmenter au fur et a mesure des manches
var maxRounds = 10;														//Nombre max de manches pour gagner

$(document).ready(function(){											

	$(".presentation").fadeIn(2000);
	$(".ok").click(function(){											//Quand on clique sur le bouton qui a l'id ok 

		window.location.reload();										//reset de la page en fin de partie

	})

});

function displayGame(){

	$(".presentation").slideUp();
	fade.play();
	setTimeout(function(){
		$(".container").fadeIn();
	},1000);
	
}

function buttonAnim(button){											//Fonction permettant d'animer les boutons
	$("#"+button).attr("src", buttonColors[button]);					//On récupère les boutons par leur id et on change leur attribut scr pour y metrte l'image illuminée
	audio[button].play();												//On joue le son du bouton associé
	setTimeout(function() { 
		audio[button].pause();											//on stop le son
		audio[button].currentTime = 0;									//et on le remet au début
		$("#"+button).attr("src", swapColors[button]);					//On remet le bouton comme il était au début
	}, audio[button].duration *1000);									//l'interval se fait sur la durée du son multiplié par 1000 car le son est en secondes et l'inter en milli
}


function newGame(){

	$(".button").css("pointer-events","auto"); 							//On active les events souris sur les boutons
	click.play(); 														//le son du click se déclanche
	$("#start").css("background-color","#00FF00")						//La couelur de fond du bouton start devient vert fluo
	.css("filter","drop-shadow(16px 16px 20px #00FF00)");				//drop shadow pour simuler la lumière
	$(".countdown").css("color","red")									//Pareil sur le compteur
	.css("filter","drop-shadow(0px 0px 10px red)");						//Pareil qu'au dessus mais en rouge


	randomTab = []; 													//le tableau de l'ordi est initialisé en tableau vide
	if (gameMove){ clearInterval(gameMove);														
	}
	setTimeout(function() {
		$(".countdown").html("--");										//Le contenu html du compteur est remplacé par 2 traits
		cpuMove();														//Lancement de la fonction cpuMove() au bout d'1 s
	}, 1000);
}



function cpuMove(chain, canIncrease){									//Fonction cpuMove(arg1 = chaine actuelle,arg2 = incrémente d'1 ?)
	$(".button").css("pointer-events","none");							//Desactivation des évenements souris
	counter = 0;														//Compteur initialisé a 0
	playerTab = [];														//tableau du joueur vide
	if (chain) {														//Si il y a une chaine

		let index = 0;													//Initialisatio nd'index a 0
		
		gameMove = setInterval(function() {								//gameMove devient un interval

			let button = chain[index];									//Le bouton est egal a la chaine à l'index[index]
			buttonAnim(button);											//On joue la fonction d'animation du bouton	

			index++;													//Et on incrémente l'index
			$(".button").css("pointer-events","auto");					//reactivation des evenements souris
			if (index >= chain.length){									//Si l'index est supérieur ou egal a la longueur d ela chaine

				clearInterval(gameMove);								//on stoppe l'interval
				if (canIncrease == true){								//On check si on peut augmenter la chaine d'un bouton supplementaire

					setTimeout(function(){ cpuMove()					//Si oui alors on relance lafonction cpuMove au bout d'une seconde et on multiplie par le facteur vitesse
					}, 1000*speed);

				}
			}				
		}, 1000*speed);													//Le tout en 1 seconde multiplié par le facteur vitesse



	} 
	else {																//Sinon
		
		let randomMove = Math.floor(Math.random()*4);					//On fait un random multiplié par 4 car 4 couleurs
		let button = buttons[randomMove];								//le bouton est egal aux boutons à l'index randomMove

		buttonAnim(button);												//On lance l'animation des boutons
		$(".button").css("pointer-events","auto");						//Et on reactive les evenements souris
		randomTab.push(button);											//On oublie pas de remplir le tableaude l'ordi avec la variable bouton



	}	
}


function playerClick(button){											//fonction de detection du clic du joueur avec en argument le bouton

	playerTab.push(button);												//On push dans le tableau le bouton pressé

	if (randomTab[counter] == playerTab[counter]){						//On compare les 2 tableaux
		buttonAnim(button);												//On lance la fonction d'animation des boutons
		counter++;														//Le compteur augmente
	} else {
		console.log("mauvais bouton");										
		$("#"+button).attr("src", buttonColors[button]);				//On joue quand même l'animation des boutons
		audio[button].play();	
		setTimeout(function() { 
			$("#"+button).attr("src",swapColors[button]);
		}, 200);

		error.play();													//Mais ici on joue le son d'erreur
		$(".countdown").html("Erreur"); 								//On affiche une icone de tete de mort dans la console du jeu
		setTimeout(function(){
			$(".countdown").html(counter);								//Et on réaffiche le compteur dans l'html de la class countdown
		},700);
		
		cpuMove(randomTab); 											//On éxécute la fonction cpuMove sur le tableau du cpu pour relancer
	}
	
	
	if (playerTab.toString() == randomTab.toString()){ 					//On compare le tableau du joueur à celui de l'ordi en prenant soin de les convertir en chaîne de caractère
		
		if (counter < 10) {
		counter = "0" + counter											//on s'assure que quand la manche est inférieure à 10 il y aura marqué 01
		}
		$(".countdown").html(counter);									//Le contenu html de countdown est égal à la variable counter 
		speed -=0.05;													//On diminue la variable speed pour augmenter l'interval
		
		if (counter < maxRounds){										//Si counter est inférieure au nombre maximum de rounds 
			setTimeout(function(){cpuMove(randomTab, true)}, 700);		//cpuMove(randomTab+bool) pour déterminer s l'ordi fera un move supplémentaire
		} else {
			
			console.log("victory");	
			$(".countdown").html("GG EZ")								//sinon la partie est terminée et on gagne
			victory.play();												//On joue le son de victoire				
			win = setInterval(win,800);	
			$(".score").html(counter);								//On lance l'interval win qui consiste a faire clignoter tous les boutons
			setTimeout(function(){
				$(".win").fadeIn();										//On attend 5 secondes pour afficher le message de victoire
			},5000);
		}
	}
}	

function win(){

	

	$("#green").attr("src","assets/images/l_green.png");
	setTimeout(function(){

		$("#green").attr("src","assets/images/green.png");

	},500)

	$("#red").attr("src","assets/images/l_red.png");
	setTimeout(function(){

		$("#red").attr("src","assets/images/red.png");

	},500)

	$("#yellow").attr("src","assets/images/l_yellow.png");
	setTimeout(function(){

		$("#yellow").attr("src","assets/images/yellow.png");

	},500)
	$("#blue").attr("src","assets/images/l_blue.png");
	setTimeout(function(){

		$("#blue").attr("src","assets/images/blue.png");

	},500)


}
