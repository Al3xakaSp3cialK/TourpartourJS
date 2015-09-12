(function(){

	var canvas= document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = "600" ;
	canvas.height ="600";
	var tourDe = "";

	function Plateau (taillePlateau , tailleCase , couleur ) {

		this.taille = taillePlateau;
		this.couleur = couleur;
		this.construire = function(){
			for ( var i = 1 ; i < taillePlateau ; i++ ){

				context.beginPath();
				context.moveTo(i*tailleCase , 0);
				context.lineTo(i*tailleCase, canvas.height);
				context.stroke();

				context.beginPath();
				context.moveTo(0, i*tailleCase );
				context.lineTo( canvas.width , i*tailleCase );
				context.stroke();
			}
		};
	}
	function Arme(nom,urlImg,puissance,x,y) {

		this.nom=nom;
		this.urlImg=urlImg;
		this.puissance=puissance;
		this.x=x;
		this.y=y;
	}
	function Player(id,nom,x,y,arme,sante){
		this.id=id;
		this.nom=nom;
		this.x=x;
		this.y=y;
		this.arme=arme;
		this.sante=sante;
		this.deplacer = function ( nomJoueur , deltaX , deltaY) {

			if ( nomJoueur == this.nom){
				this.x += deltaX;
				this.y += deltaY;
			}
		};
		this.prendreArme = function(){

			if (  this.x  == pistolet.x && this.y == pistolet.y ) {
				this.arme = pistolet;
			}
			if (  this.x  == fusilAssaut.x && this.y == fusilAssaut.y ) {
				this.arme = fusilAssaut;
			}
			if (  this.x  == fusilPompe.x && this.y == fusilPompe.y ) {
				this.arme = fusilPompe;
			}
			if (  this.x  == bazooka.x && this.y == bazooka.y ) {
				this.arme = bazooka;
			}

		};
		this.dessiner = function(){
			var position = [this.x,this.y];
		}
	}

	var monPlateau = new Plateau(10, 60 , "white");

	var pistolet = new Arme("Pistolet","#",10, Math.floor( 0.1 + Math.random()*10 ) , Math.floor( 0.1 + Math.random()*10 ) );
	var fusilAssaut = new Arme("Fusil d'assaut","#",15, Math.floor(Math.random()), Math.floor( 0.1 + Math.random()*10 ) );
	var fusilPompe = new Arme("Fusil à pompe","#",30, Math.floor( 0.1 + Math.random()*10 ) , Math.floor( 0.1 + Math.random()*10 ) );
	var bazooka = new Arme("Bazooka","#",50, Math.floor( 0.1 + Math.random()*10 ) , Math.floor( 0.1 + Math.random()*10 ) );

	var player1 = new Player(1 , 
		"Alex" , 
		Math.floor(Math.random()*9+1) , 
		Math.floor(Math.random()*9+1) ,
		pistolet ,
		100)
	;
	var player2 = new Player(2 , 
		"Ade" , 
		Math.floor(Math.random()*9+1) , 
		Math.floor(Math.random()*9+1) ,
		pistolet ,
		100)
	;

	// a editer
	player1.combattre = function(){
		if ( ( this.x  == player2.x-1 && this.y == player2.y) || ( this.x  == player2.x+1 && this.y == player2.y) || ( this.x  == player2.x && this.y == player2.y-1) || ( this.x  == player2.x && this.y == player2.y+1) ) {
			while ( player1.sante > 0 || player2.sante >0 ) {
				adversaire.sante -= joueurActuel.arme.puissance;

				if ( player2.sante >0 ){
					joueurActuel.sante -= player2.arme.puissance;
				}				
			}
			tourDe = false;

		}
	};
	player1.vaincre = function(){
		if (player2.sante<0){
			return true;
		} else {
			return false;
		}
	};
	player2.combattre = function(){
		if ( ( this.x  == player1.x-1 && this.y == player1.y) || ( this.x  == player1.x+1 && this.y == player1.y) || ( this.x  == player1.x && this.y == player1.y-1) || ( this.x  == player1.x && this.y == player1.y+1) ) {

			while ( player1.sante > 0 || player2.sante >0 ) {
				adversaire.sante -= joueurActuel.arme.puissance;

				if ( player1.sante >0 ){
					joueurActuel.sante -= player1.arme.puissance;
				}				
			}
			tourDe = false;
		}
	};
	player2.vaincre = function(){
		if(player1.sante<0){
			return true;
		} else {
			return false;
		}
	};

	function annoncerGagnant () {
		if (player1.vaincre()) {
			alert( player1.nom + " a gagné! Cliquez sur OK pour relancer une partie.")
		} else if (player2.vaincre()) {
			alert( player2.nom + " a gagné! Cliquez sur OK pour relancer une partie.")
		} else {
			alert("Error! Reloading game.");
		}
	}

	function init () {

		monPlateau.construire();

		tourDe = prompt("Qui commence? Tapez le nom du Joueur");
		while ( tourDe == player1.nom || tourDe == player2.nom ) {

		/*
			var vitesseX = caseCible.x - joueurActuel.x;
			var vitesseY = caseCible.y - joueurActuel.y;

			player1.deplacer(tourDe , vitesseX , vitesseY);
			player2.deplacer(tourDe , vitesseX , vitesseY);

			while ( player1.x == player2.x && player1.y == player2.y) {

				player2.x = Math.floor(Math.random());
				player2.y = Math.floor(Math.random());
			}

			if ( tourDe == player1.nom ){
			player1.dessiner();
			} else if ( tourDe == player2.nom ){
			player2.dessiner();
			}

			interagir(joueurActuel.x,joueurActuel.y);
			player1.prendreArme();
			player2.prendreArme();
			if ( tourDe == player1.nom ){
				player1.combattre();
			} else if ( tourDe == player2.nom ){
				player2.combattre();
			} else {
				alert("Erreur");
				document.reload();
			}
			*/
			tourDe = false;
		}
		
		annoncerGagnant();
		location.reload();
	}

	init();
})();