//déclaration des variables audio
var blueSound = new Audio("sounds/son1.mp3");
var greenSound = new Audio("sounds/son2.mp3");
var redSound = new Audio("sounds/son3.mp3");
var yellowSound = new Audio("sounds/son4.mp3");
var loseSound = new Audio("sounds/lose.mp3");
var fadeSound = new Audio("sounds/fade.wav");
//déclaration de toutes les variables
var green,red,yellow,blue,touches,randomTab,playerTab,number,count,round,speed;

//fonction qui est lancée au clic du bouton commencer
function titleScreen(){
	$("#title").fadeIn();//Le titre se montre
	$("#start").hide();//le bouton commencer se cache

	$(".gameHolder").fadeIn().addClass("animated bounceInUp delay-2s");//La div qui contient le jeu fait un animation
	setTimeout(function(){
		fadeSound.play();//truc useless pour donner du style
	},2200);
	setTimeout(function(){
		$("#title").fadeOut();
	},5000);
	setTimeout(function(){

		$(".container").fadeIn(2000);
	},7000);
	
}

//Initialisation des variables
function init(){

	green = $("#green");
	red = $("#red");
	yellow = $("#yellow");
	blue = $("#blue");
	touches = $(".input");
	speed = 0.8;
	//Les touches ne peuvent pas être pressées au début du jeu car provoquerai une erreur instantanément
	$(".input").css("pointer-events","none");
	//tableau de l'ordi
	randomTab = [];
	//tableau du joueur
	playerTab =[];

	
	//interval = null
	count = null;
	//Variables des manches initialisée à zéro
	round = 0;


}
//Fonction pour commencer le jeu
function startGame(){

	//time est la valeur du countdown, toujours 4 secondes à voir si l'on diminue le temps possible entre chaque boutons pressés
	time = 4;
	//Au cas ouù on précise bien que les touches ne peuvent pas avoir d'évenements souris
	$(".input").css("pointer-events","none");
	//On desactive le bouton allumer du jeu pour éviter de lancer plusieurs parties ne même temps
	$("#go").attr("disabled",true);
	//On lance la fonction randomize
	randomize(randomTab);
	//On lance la fonction createTimer 
	createTimer(randomTab);
}

//Fonction permettant d'insérer une valeur random dans un tableau argument (tab)
function randomize(tab){
	var random = Math.ceil(Math.random()*4);
	tab.push(random);
	return tab;

}


function createTimer(tab){
	i=0;
	number = 0;
	//le tableau du joueur doit être vide au début
	playerTab =[];


	var timer = setInterval(function(){
		//on défini une variable index qui est égal a tab à l'index i
		var index = tab[i];
		//on lance la fonction swapImage en lui faisant passer un argument index 
		swapImage(index)
		//on incrémente i
		i+=1;
		//donc si i est egal à la longueur du tableau alors on arrête l'interval
		if (i == tab.length){
			clearInterval(timer)
			//initialisation du countdown a 4 secondes
			var time = 4;
			//count est maintenant un interval qui va update le contenu(le texte de la classe countdown toutes les 1 secondes)
			count = setInterval(function(){
				//donc la on rempli le texte de la classe countdown par la variable time qui est pour l'instant à 4
				$(".countdown").text(time);
				//On décrémente time
				time--;
				//Si time est égal a -1 alors on a perdu 
				if (time == -1){
					//façon de perdre avec en argument une chaine de caractère noTime(donc si on est pas assez rapide pour répondre)
					lose("noTime");
				}
			},1000);
			//On précise que là nous pouvons autoriser les evenements de souris sur les images
			$(".input").css("pointer-events","auto");
		}
	},1000 *speed);
	
}
//La fonctio npermettant donc de faire un changement d'image en passant en argument l'index
function swapImage(index){
	//donc si l'indexest egal a 1 c'est à dire green
	if (index == 1){
		console.log("ordi choisi vert !");
		$("#green").attr("src","./images/l_green.png");//le bouton s'allume
		greenSound.play()//le son se joue
		setTimeout(function(){
			$("#green").attr("src","./images/green.png");//le bouton redevient normal
		},greenSound.duration *1000);
	}
	if (index == 2){
		console.log("ordi choisi rouge !");
		$("#red").attr("src","images/l_red.png")
		redSound.play()
		setTimeout(function(){
			$("#red").attr("src","./images/red.png");
		},redSound.duration *1000);
	}
	if (index == 3){
		console.log("ordi choisi bleu !");
		$("#blue").attr("src","./images/l_blue.png");
		blueSound.play();
		setTimeout(function(){
			$("#blue").attr("src","./images/blue.png");
		},blueSound.duration *1000);
	}
	if (index == 4){
		console.log("ordi choisi jaune !");
		$("#yellow").attr("src","./images/l_yellow.png");
		yellowSound.play();
		setTimeout(function(){
			$("#yellow").attr("src","./images/yellow.png");
		},yellowSound.duration *1000);
	}

}
//la fonction permettant de comparer le tableau de l'ordi et celui du joueur
function check(tabCpu, tabPly){
	//si tableua de l'ordi différent de tableau joueur
	if(tabCpu[number] != tabPly[number]){
		console.log("perdu")//on perd
		lose("wrongChoice");//on perd de la façon mauvais choix !
		
	}
	//On compare la longueur du tableau du joueur et celle de l'ordi ainsi que leur identicité de contenu
	if (tabPly.length == tabCpu.length && tabCpu[number] == tabPly[number]){
		//On relance une manche au bout de 0.1 secondes
		setTimeout(startGame(), 100)	
		//$(".countdown").html("Manche terminée !");//A voir pour afficher et montrer au joueur qyu'il a terminé et réussi sa manche
		//Une manche a été réalisée donc le compteur de manche augmente
		round++;
		//le facteur de vitesse est diminué pour augmenter la vitesse de l'interval
		speed-= 0.07;
		//On arrête l'interval qui fait le countdown 
		clearInterval(count)
		//et on réinitialise a 4
		time = 4;
	}
	

}
//Fonction détaillant les façons de perdre avec en paramètre la façon de perdre
function lose(loseType){
	//Switch pour comparer 2 types de lose
	switch (loseType){
		//dans le cas ou on a pas répondu a temps
		case "noTime": console.log("perdu, faute de temps !");
		loseSound.play();
		$(".lose h1").text("Perdu faute de temps !");
		$(".lose").fadeIn().css("display","flex");
		$(".lose p span").text(round);
		clearInterval(count);
		speed = 0.8;
		randomTab = [];
		
		break;
		//Dans le cas ou on a appuyé sur le mauvais bouton
		case "wrongChoice" : console.log("perdu, mauvais bouton !");
		loseSound.play();
		$(".lose h1").text("Perdu mauvais bouton !");
		$(".lose").fadeIn().css("display","flex");
		$(".lose p span").text(round);
		clearInterval(count);
		speed = 0.8;
		randomTab=[];
		break;
		//choix par defaut obligatoire au cas ou aucune des 2 condition n'est respectée
		default : console.log("perdu");
	}
	//Quand on clique sur le bouton rejouer
	$(".lose .ok").click(function(){
		$(".lose").fadeOut();//L'ecran de défaite disparait
		//On réinitialise les variables
		number = 0;
		setTimeout(function(){
			init();
			startGame();//Et on relance une partie automatiquement
		},500)
		
		//$("#go").attr("disabled",false);
		time = 0;
		$(".countdown").text(time);
		
	});
	
}


$ (document).ready(function(){
	//Quand on appuie sur le bouton commencer
	$("#start").click(function(){
		//la fonction titleScreen ets lancée
		init();
		titleScreen();
	})
	//Quand on clique sur le  bouton noir
	$("#go").click(function(){
		//il devient vert fluo
		$("#go").css("background-color", "#00FF00")
		startGame();//Et la partie se lance
	});
	//clic sur une image
	$("#green").mousedown(function(){
		greenSound.play();
		$("#green").attr("src","images/l_green.png");
		playerTab.push(1);//on ajoute la valeur 1 dans le tableau du joueur
		check(randomTab, playerTab);//On lance la fonction qui compare les tableaux avec donc en argument le tableau de l'ordi et le tableau du joueur
		console.log("joueur choisi vert !");
		setTimeout(function(){
			$("#green").attr("src", "images/green.png");	
		},greenSound.duration *1000);
	})
	
	$("#red").mousedown(function(){
		redSound.play();
		$("#red").attr("src","images/l_red.png");
		playerTab.push(2);
		check(randomTab, playerTab);
		console.log("joueur choisi rouge !");
		setTimeout(function(){
			$("#red").attr("src","images/red.png");
		},redSound.duration *1000);
	})
	

	
	$("#blue").mousedown(function(){
		blueSound.play();
		$("#blue").attr("src","images/l_blue.png");
		playerTab.push(3);
		check(randomTab, playerTab);
		console.log("joueur choisi bleu !");
		setTimeout(function(){
			$("#blue").attr("src","images/blue.png");
		},blueSound.duration *1000);
	})
	
	$("#yellow").mousedown(function(){
		yellowSound.play();
		$("#yellow").attr("src","images/l_yellow.png");
		playerTab.push(4);
		check(randomTab, playerTab);
		console.log("joueur choisi jaune !");
		setTimeout(function(){
			$("#yellow").attr("src","images/yellow.png");
		},yellowSound.duration *1000);
	})
	
	
	//Initialisation par défaut au chargement du DOM



})