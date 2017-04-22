var canvasJeu = document.getElementById('jeu');
var context = canvasJeu.getContext('2d');
var mur = document.getElementById("mur");
var imagePistolet = document.getElementById("pistolet");
var imageFusilAssaut = document.getElementById("fusilAssaut");
var imageFusilPompe = document.getElementById("fusilPompe");
var imageBazooka = document.getElementById("bazooka");
var imageMur = document.getElementById("mur");
var afficherTour = document.getElementById("tour");
var afficherDeplacements = document.getElementById("deplacements");
var afficherJoueur1 = document.getElementById("joueur1");
var afficherJoueur2 = document.getElementById("joueur2");
canvasJeu.width = "600" ;
canvasJeu.height = canvasJeu.width;
var taillePlateau = 10;
var tailleCase = canvasJeu.width/taillePlateau;
var timer;
var tourDe="";
var mouvement = [0,0];
var key = [];

document.addEventListener( "keydown" , function(e){
	e.preventDefault();
	key[e.keyCode] = e.type == 'keydown';
}) ;

function play(qui){

	monPlateau.detruire();
	monPlateau.construire();

	if (qui == player1.nom){
		player1.deplacer();
	} else if (qui == player2.nom){
		player2.deplacer();
	}
}
function majAffichage(){
	afficherJoueur1.innerHTML="Joueur 1 : " + player1.nom + " Santé : " + player1.sante +" " + player1.y + " Arme : " + player1.arme.nom + " " + player1.arme.puissance + " de puissance";
	afficherJoueur2.innerHTML= "Joueur 2 : " + player2.nom + " Santé : " + player2.sante + " " + player2.y + " Arme : " + player2.arme.nom + " " + player2.arme.puissance + " de puissance";
}
// Passe la main à l'autre joueur
function changeTour(){
	if ( player1.limiteMouvements<=0) {

		tourDe = player2.nom;
		player1.limiteMouvements=3;

	} else if ( player2.limiteMouvements<=0){

		tourDe = player1.nom;
		player2.limiteMouvements=3;
	}
}
// Vérifie si le jeu est terminé
function verifGameOver(santeDuJoueur1,santeDuJoueur2){
	if ( santeDuJoueur1 <= 0 || santeDuJoueur2 <= 0 ){

		clearInterval(timer);
		annoncerGagnant();
		window.location.reload();

	}
}
// Donne le nom du gagnant
function annoncerGagnant () {
	if (player2.sante <=0) {
		alert( player1.nom + " a gagné! Cliquez sur OK pour relancer une partie.");
	} else if (player1.sante <=0) {
		alert( player2.nom + " a gagné! Cliquez sur OK pour relancer une partie.");
	} else {
		alert("Error! Reloading game.");
	}
}
