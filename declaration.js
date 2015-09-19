var canvasJeu = document.getElementById('jeu');
var context = canvasJeu.getContext('2d');
var mur = document.getElementById("mur");
var imagePistolet = document.getElementById("pistolet");
var imageFusilAssaut = document.getElementById("fusilAssaut");
var imageFusilPompe = document.getElementById("fusilPompe");
var imageBazooka = document.getElementById("bazooka");
var imageMur = document.getElementById("mur");
var afficherTour = document.getElementById("tour");
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

// Complet
function Plateau (taillePlateau , tailleCase) {

	this.taille = taillePlateau;
	this.couleur = "#4C4C4C";
	this.murs = [
	[Math.floor( Math.random()*taillePlateau + 1 ),Math.floor( Math.random()*taillePlateau + 1 )]
	,[Math.floor( Math.random()*taillePlateau + 1 ),Math.floor( Math.random()*taillePlateau + 1 )]
	,[Math.floor( Math.random()*taillePlateau + 1 ),Math.floor( Math.random()*taillePlateau + 1 )]
	,[Math.floor( Math.random()*taillePlateau + 1 ),Math.floor( Math.random()*taillePlateau + 1 )]
	,[Math.floor( Math.random()*taillePlateau + 1 ),Math.floor( Math.random()*taillePlateau + 1 )]]
	;
	this.construire = function(){

		context.fillStyle = this.couleur;
		context.fillRect( 0, 0 , tailleCase * taillePlateau , tailleCase * taillePlateau );

		for ( var i = 0 ; i < this.murs.length ; i++ ){
			while ( (this.murs[i][0] == player1.x && this.murs[i][1] == player1.y) || (this.murs[i][0] == player2.x  && this.murs[i][1] == player2.y) || (this.murs[i][0] == pistolet.x  && this.murs[i][1] == pistolet.y) || (this.murs[i][0] == fusilAssaut.x  && this.murs[i][1] == fusilAssaut.y) || (this.murs[i][0] == fusilPompe.x  && this.murs[i][1] == fusilPompe.y) || (this.murs[i][0] == bazooka.x  && this.murs[i][1] == bazooka.y) ){
				this.murs[i][0] = Math.floor( Math.random()* taillePlateau);
				this.murs[i][1] = Math.floor( Math.random()* taillePlateau);
			}
			context.drawImage( imageMur , this.murs[i][0] * tailleCase , this.murs[i][1] * tailleCase , tailleCase , tailleCase );
		}

		player1.dessiner();
		player2.dessiner();

		if ( pistolet.dessiner ){
			pistolet.dessiner();
		}
		if ( fusilAssaut.dessiner ){
			fusilAssaut.dessiner();
		}
		if ( fusilPompe.dessiner ){
			fusilPompe.dessiner();
		}
		if ( bazooka.dessiner ){
			bazooka.dessiner();
		}

		afficherTour.innerHTML = "C'est le tour de " + tourDe ;

	};
	this.detruire = function(){
		context.clearRect(0,0, taillePlateau * tailleCase , taillePlateau * tailleCase );
	};
}
var monPlateau = new Plateau( taillePlateau , tailleCase );
// Complet
function Arme(nom,img,puissance,x,y) {

	this.nom=nom;
	this.img=img;
	this.puissance=puissance;
	this.x=x;
	this.y=y;
	this.dessiner = function(){

		while ( (this.x == player1.x && this.y == player1.y) || (this.x == player2.x  && this.y == player2.y) ){
			this.x = Math.floor( Math.random()* taillePlateau);
			this.y = Math.floor( Math.random()* taillePlateau);
		}
		context.drawImage( this.img , this.x * tailleCase + 5 , this.y * tailleCase + 5 , tailleCase - 10 , tailleCase - 10 );

	};
}

var pistolet = new Arme("Pistolet", imagePistolet ,10, Math.floor( Math.random()* taillePlateau) , Math.floor( Math.random()* taillePlateau) );
var fusilAssaut = new Arme("Fusil d'assaut", imageFusilAssaut ,15, Math.floor( Math.random()* taillePlateau), Math.floor( Math.random()* taillePlateau) );
var fusilPompe = new Arme("Fusil à pompe", imageFusilPompe ,30, Math.floor( Math.random()* taillePlateau ) , Math.floor( Math.random()* taillePlateau) );
var bazooka = new Arme("Bazooka", imageBazooka ,50, Math.floor( Math.random()* taillePlateau ) , Math.floor( Math.random()* taillePlateau) );

function Player(id,nom,x,y,arme,sante,couleur){
	this.id=id;
	this.nom=nom;
	this.x=x;
	this.y=y;
	this.arme=arme;
	this.sante=sante;
	this.couleur=couleur;
	this.limiteMouvements=3;
	this.verifierCollision = function(code){
		var mur;
		var p;
		switch(code){
			case 37:
			for ( p=0 ; p<monPlateau.murs.length ; p++ ){

				if( this.x - 1 == monPlateau.murs[p][0] && this.y == monPlateau.murs[p][1] ){
					mur = 1 ;
				}
			}
			break;

			case 38:
			for ( p=0 ; p<monPlateau.murs.length ; p++ ){

				if( this.y - 1 == monPlateau.murs[p][1] && this.x == monPlateau.murs[p][0] ){
					mur = 1 ;
				}

			}
			break;

			case 39:
			for ( p=0 ; p<monPlateau.murs.length ; p++ ){

				if( this.x + 1 == monPlateau.murs[p][0] && this.y == monPlateau.murs[p][1] ){
					mur = 1 ;
				}

			}
			break;

			case 40:
			for ( p=0 ; p<monPlateau.murs.length ; p++ ){

				if( this.y + 1 == monPlateau.murs[p][1] && this.x == monPlateau.murs[p][0] ){
					mur = 1 ;
				}

			}
			break;
		}
		if ( mur == 1 ) {
			mur = undefined;
			return true;
		}else{
			mur = undefined ;
			return false;
		}
	};
	this.deplacer = function () {
		if ( key[37] ){
			if ( this.x > 0 && !this.verifierCollision(37) ){
				mouvement = [-1,0];

			} else {
				mouvement = [0,0];
				alert("Vous vous êtes cogné contre un mur... ça fait mal!");

			}
			this.limiteMouvements -= 1 ;
		}
		else if ( key[38] ){
			if ( this.y > 0 && !this.verifierCollision(38) ){
				mouvement = [0,-1];
			} else {
				mouvement = [0,0];
				alert("Vous vous êtes cogné contre un mur... ça fait mal!");

			}
			this.limiteMouvements -= 1 ;
		}
		else if ( key[39] ){
			if ( this.x < taillePlateau - 1 && !this.verifierCollision(39) ){
				mouvement = [1,0];
			} else {
				mouvement = [0,0];
				alert("Vous vous êtes cogné contre un mur... ça fait mal!");

			}
			this.limiteMouvements -= 1 ;
		}
		else if ( key[40] ){
			if ( this.y < taillePlateau - 1 && !this.verifierCollision(40) ){
				mouvement = [0,1];

			} else {
				mouvement = [0,0];
				alert("Vous vous êtes cogné contre un mur... ça fait mal!");

			}
			this.limiteMouvements -= 1 ;
		}


		this.x += mouvement[0];
		this.y += mouvement[1];
		afficherJoueur1.innerHTML=player1.x +" " + player1.y ;
		afficherJoueur2.innerHTML=player2.x +" " + player2.y;
		key[38] = false;
		key[39] = false;
		key[37] = false;
		key[40] = false;
		mouvement=[0,0];

		this.prendreArme();

		monPlateau.detruire();
		monPlateau.construire();

		this.combattre();

		changeTour(tourDe);
	};
	this.prendreArme = function(qui){
		if (  this.x  == pistolet.x && this.y == pistolet.y ) {


			this.arme = pistolet;
			delete pistolet.dessiner;
			delete pistolet.x;
			delete pistolet.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
		if (  this.x  == fusilAssaut.x && this.y == fusilAssaut.y ) {
			this.arme = fusilAssaut;
			delete fusilAssaut.dessiner;
			delete fusilAssaut.x;
			delete fusilAssaut.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
		if (  this.x  == fusilPompe.x && this.y == fusilPompe.y ) {
			this.arme = fusilPompe;
			delete fusilPompe.dessiner;
			delete fusilPompe.x;
			delete fusilPompe.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
		if (  this.x  == bazooka.x && this.y == bazooka.y ) {
			this.arme = bazooka;
			delete bazooka.dessiner;
			delete bazooka.x;
			delete bazooka.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
	};
	this.combattre = function(){

		if ( this === player1 ){

			if ( ( player1.x  == player2.x-1 && player1.y == player2.y) || ( player1.x  == player2.x+1 && player1.y == player2.y) || ( player1.x  == player2.x && player1.y == player2.y-1) || ( player1.x  == player2.x && player1.y == player2.y+1) ) {
				alert("Combat! Joueur 1");

				while ( player1.sante > 0 && player2.sante >0 ) {
					player2.sante -= player1.arme.puissance;

					if ( player2.sante >0 ){
						player1.sante -= player2.arme.puissance;
					}		
				}

				return function(){
					this.limiteMouvements = 0;
				};
			}
		}
		if ( this === player2 ){

			if ( ( player2.x  == player1.x-1 && player2.y == player1.y) || ( player2.x  == player1.x+1 && player2.y == player1.y) || ( player2.x  == player1.x && player2.y == player1.y-1) || ( player2.x  == player1.x && player2.y == player1.y+1) ) {
				alert("Combat! Joueur 2");

				while ( player1.sante > 0 && player2.sante > 0 ) {
					player1.sante -= player2.arme.puissance;

					if ( player1.sante >0 ){
						player2.sante -= player1.arme.puissance;
					} 	
				}
				return function(){
					this.limiteMouvements = 0;
				};
			}
		}
	};
	this.dessiner = function(){
		context.strokeStyle = this.couleur;
		context.beginPath();
		context.moveTo( this.x * tailleCase + 5 , this.y * tailleCase + tailleCase/2 );
		context.lineTo( (this.x + 1 ) * tailleCase - 5 , this.y * tailleCase + tailleCase/2 );
		context.stroke();
	};
}

var player1 = new Player(1 , 
	"Alex" , 
	Math.floor( Math.random() * taillePlateau ) , 
	Math.floor( Math.random() * taillePlateau ) ,
	pistolet ,
	100,
	"blue")
;
var player2 = new Player(2 , 
	"Ade" , 
	Math.floor( Math.random() * taillePlateau ) , 
	Math.floor( Math.random() * taillePlateau ) ,
	pistolet ,
	100,
	"red")
;

// Complet
function changeTour(){
	if ( player1.limiteMouvements<=0) {

		tourDe = player2.nom;
		player1.limiteMouvements=3;
		//alert("C'est maintenant le tour de " + tourDe)

	} else if ( player2.limiteMouvements<=0){

		tourDe = player1.nom;
		player2.limiteMouvements=3;
		//alert("C'est maintenant le tour de " + tourDe)

	} else if( tourDe == player1.nom || tourDe== player2.nom ){
		//alert("C'est toujours le tour de "+ tourDe);
	} else {
		alert("ce n'est le tour de personne!")
	}
}
// Complet
function verifGameOver(santeDuJoueur1,santeDuJoueur2){
	if ( santeDuJoueur1 <= 0 || santeDuJoueur2 <= 0 ){

		clearInterval(timer);
		annoncerGagnant();
		window.location.reload();

	}
}
// Complet
function annoncerGagnant () {
	if (player2.sante <=0) {
		alert( player1.nom + " a gagné! Cliquez sur OK pour relancer une partie.");
	} else if (player1.sante <=0) {
		alert( player2.nom + " a gagné! Cliquez sur OK pour relancer une partie.");
	} else {
		alert("Error! Reloading game.");
	}
}