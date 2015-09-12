(function(){

	//Prendre les variables utiles au dessin
	var canvas= document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var canvasW = canvas.width;
	var canvasH = canvas.height;

	canvasW = "600" ;
	canvasH ="600";
	var tour = "";
	// Le plateau
	
	function Plateau (taillePlateau , couleur ) {
		this.taille = taillePlateau;
		this.couleur = couleur;
		
		this.Case = function (x,y,mur) {
			this.x=x;
			this.y=y;
			this.c=10;
			this.mur=mur;
		};
		this.construire = function(){
			for ( var i = 0 ; i <= taillePlateau ; i++ ){
				//Construire case
			}
		};
		
	}
	
	var monPlateau = Plateau(10, "white");
	
	//Les armes

	function Arme(nom,urlImg,puissance,x,y) {

		this.nom=nom;
		this.urlImg=urlImg;
		this.puissance=puissance;
		this.x=x;
		this.y=y;
	}

	var pistolet = new Arme("Pistolet","#",10, Math.floor( 0.1 + Math.random()*10 ) , Math.floor( 0.1 + Math.random()*10 ) );
	var fusilAssaut = new Arme("Fusil d'assaut","#",15, Math.floor(Math.random()), Math.floor( 0.1 + Math.random()*10 ) );
	var fusilPompe = new Arme("Fusil à pompe","#",30, Math.floor( 0.1 + Math.random()*10 ) , Math.floor( 0.1 + Math.random()*10 ) );
	var bazooka = new Arme("Bazooka","#",50, Math.floor( 0.1 + Math.random()*10 ) , Math.floor( 0.1 + Math.random()*10 ) );

	//les joueurs
	function Player(id,nom,x,y,arme,sante){
		this.id=id;
		this.nom=nom;
		this.x=x;
		this.y=y;
		this.arme=pistolet;
		this.sante=100;
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
	}

	var player1 = Player(1 , prompt("Nom du joueur 1:") , Math.floor(Math.random()) , Math.floor(Math.random()) , pistolet , 100);
	var player2 = Player(2 , prompt("Nom du joueur 2:") , Math.floor(Math.random()) , Math.floor(Math.random()) , pistolet , 100);
/*
	player1.combattre = function(){
		if ( ( this.x  == player2.x-1 && this.y == player2.y) || ( this.x  == player2.x+1 && this.y == player2.y) || ( this.x  == player2.x && this.y == player2.y-1) || ( this.x  == player2.x && this.y == player2.y+1) ) {
			while ( player1.sante > 0 || player2.sante >0 ) {
				adversaire.sante -= joueurActuel.arme.puissance;

				if ( player2.sante >0 ){
					joueurActuel.sante -= player2.arme.puissance;
				}				
			}
			tour = false;

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
			tour = false;
		}
	};
	player2.vaincre = function(){
		if(player1.sante<0){
			return true;
		} else {
			return false;
		}
	};
	*/
	/*
	function init () {

		//Dessiner le plateau
		dessinerPlateau();

		//Code principal du jeu

		tour = prompt("Qui commence? Tapez le nom du Joueur");
		while ( tour == true ) {
			//Soit en cliquant soit en utilisant els flèches du clavier?
			//Demander case de destination
			

			var vitesseX = caseCible.x - joueurActuel.x;
			var vitesseY = caseCible.y - joueurActuel.y;

			//Déplacer les joueurs OK
			player1.deplacer(tour , vitesseX , vitesseY);
			player2.deplacer(tour , vitesseX , vitesseY);

			//Placer les joueurs correctement OK
			while ( player1.x == player2.x && player1.y == player2.y) {

				player2.x = Math.floor(Math.random());
				player2.y = Math.floor(Math.random());
			}

			dessinerJoueurs(player1.x,player1.y,player2.x,player2.y);

			//Evaluer la situation En déduire les décisions à prendre
			interagir(joueurActuel.x,joueurActuel.y);
			player1.prendreArme();
			player2.prendreArme();
			if ( tour == player1.nom ){
				player1.combattre();
			} else if ( tour == player2.nom ){
				player2.combattre();
			} else {
				alert("Erreur");
				document.reload();
			}
			
		}

		annoncerGagnant();
		document.reload();
	}


	function vider (caseX , caseY) {
		canvas.clearRect(x,y);
	}
	*/
	//Semble correct
	/* function dessinerPlateau () {

		var laCase;
		var dessinLigne=[];
		var dessin=[];

		function dessinerCase(x,y){
			return function(){
				laCase = new Case(x,y,false);
				context.fillRect(x,y,laCase.c,laCase.c);
			}
		}

		function dessinerLigne(y){
			return function(){
				for ( var j = 0; j<taillePlateau ; j++){
					dessincase[j] = dessinerCase(j , y);
				}
			}
		}

		for ( var i=0; i<taillePlateau ; i++){
			dessin[i] = dessinerLigne(i);
		}

		for ( var k = 0 ; k<dessinLigne.length ; k++){
			dessin[k];
		}
	}

	function annoncerGagnant () {
		if (player1.vaincre()) {
			alert( player1.nom + " a gagné! Cliquez sur OK pour relancer une partie.")
		} else if (player2.vaincre()) {
			alert( player2.nom + " a gagné! Cliquez sur OK pour relancer une partie.")
		} else {
			alert("Error! Reloading game.");
		}
	}
	*/
})();