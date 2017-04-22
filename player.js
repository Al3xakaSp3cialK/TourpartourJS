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
		else if ( key[13] ){
			this.limiteMouvements=0;
		}


		this.x += mouvement[0];
		this.y += mouvement[1];
		afficherDeplacements.innerHTML = 'Il vous reste ' + this.limiteMouvements + " déplacements...";
		majAffichage();
		key[38] = false;
		key[39] = false;
		key[37] = false;
		key[40] = false;
		key[13] = false;
		mouvement=[0,0];

		this.prendreArme();

		monPlateau.detruire();
		monPlateau.construire();

		this.combattre();

		changeTour(tourDe);
	};
	this.lacherArme = function(arme){
		if ( arme == pistolet ) {
			if ( !pistolet.x && !pistolet.y ){
				pistolet.x = Math.floor( Math.random()* taillePlateau );
				pistolet.y = Math.floor( Math.random()* taillePlateau );
			}
		} else if ( arme == fusilAssaut ){
			fusilAssaut.x = Math.floor( Math.random()* taillePlateau );
			fusilAssaut.y = Math.floor( Math.random()* taillePlateau );
		}
		else if ( arme == fusilPompe ){
			fusilPompe.x =Math.floor( Math.random()* taillePlateau );
			fusilPompe.y = Math.floor( Math.random()* taillePlateau );
		}
		else if ( arme == bazooka ){
			bazooka.x =Math.floor( Math.random()* taillePlateau );
			bazooka.y = Math.floor( Math.random()* taillePlateau );
		}
	};
	this.prendreArme = function(){
		
		if (  this.x  == pistolet.x && this.y == pistolet.y ) {
			this.lacherArme(this.arme);

			this.arme = pistolet;
			delete pistolet.x;
			delete pistolet.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
		if (  this.x  == fusilAssaut.x && this.y == fusilAssaut.y ) {
			this.lacherArme(this.arme);

			this.arme = fusilAssaut;
			delete fusilAssaut.x;
			delete fusilAssaut.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
		if (  this.x  == fusilPompe.x && this.y == fusilPompe.y ) {
			this.lacherArme(this.arme);

			this.arme = fusilPompe;
			delete fusilPompe.x;
			delete fusilPompe.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
		if (  this.x  == bazooka.x && this.y == bazooka.y ) {
			this.lacherArme(this.arme);

			this.arme = bazooka;
			delete bazooka.x;
			delete bazooka.y;
			alert(this.nom + " s'empare d'un " + this.arme.nom);
		}
	};
	this.combattre = function(){
		var attaquerOuDefendre1 = true;
		var attaquerOuDefendre2 = true;
		if ( this === player1 ){

			if ( ( player1.x  == player2.x-1 && player1.y == player2.y) || ( player1.x  == player2.x+1 && player1.y == player2.y) || ( player1.x  == player2.x && player1.y == player2.y-1) || ( player1.x  == player2.x && player1.y == player2.y+1) ) {
				alert("Combat! Le joueur 1 attaque!");


				while ( player1.sante > 0 && player2.sante > 0 ) {
					attaquerOuDefendre2 = confirm("Joueur 2 voulez vous répliquer à l'attaque? Sinon vous vous mettrez à couvert de 50% des dommages mais perdrez 60% de puissance de feu.");

					if ( attaquerOuDefendre2 === true ){

						if ( attaquerOuDefendre1=== true ){
							player2.sante -= player1.arme.puissance;	
						}else{
							player2.sante -= player1.arme.puissance*40/100;
						}

					}else{
						player2.sante -= player1.arme.puissance/2;
					}
					majAffichage();
					if ( player2.sante >0 ){
						attaquerOuDefendre1 = confirm("Joueur 1 voulez vous répliquer à l'attaque? Sinon vous vous mettrez à couvert de 50% des dommages mais perdrez 60% de puissance de feu.");
						
						if ( attaquerOuDefendre1 === true ){
							
							if ( attaquerOuDefendre2 === true ){
								player1.sante -= player2.arme.puissance;	
							}else{
								player1.sante -= player2.arme.puissance*40/100;
							}
						}else{
							player1.sante -= player2.arme.puissance/2;
						}
					}
					majAffichage();		
				}
				return function(){
					this.limiteMouvements = 0;
				};
			}
		}
		if ( this === player2 ){

			if ( ( player2.x  == player1.x-1 && player2.y == player1.y) || ( player2.x  == player1.x+1 && player2.y == player1.y) || ( player2.x  == player1.x && player2.y == player1.y-1) || ( player2.x  == player1.x && player2.y == player1.y+1) ) {
				alert("Combat! Le joueur 2 attaque!");


				while ( player1.sante > 0 && player2.sante > 0 ) {
					attaquerOuDefendre1 = confirm("Joueur 1 voulez vous répliquer à l'attaque? Sinon vous vous mettrez à couvert de 50% des dommages mais perdrez 60% de puissance de feu.");

					if ( attaquerOuDefendre1 === true ){

						if ( attaquerOuDefendre2 === true ){
							player1.sante -= player2.arme.puissance;	
						}else{
							player1.sante -= player2.arme.puissance*40/100;
						}
					}else{
						player1.sante -= player2.arme.puissance/2;
					}
					majAffichage();
					if ( player1.sante >0 ){
						attaquerOuDefendre2 = confirm("Joueur 2 voulez vous répliquer à l'attaque? Sinon vous vous mettrez à couvert de 50% des dommages mais perdrez 60% de puissance de feu.");
						
						if ( attaquerOuDefendre2 === true ){
							
							if ( attaquerOuDefendre1=== true ){
								player2.sante -= player1.arme.puissance;	
							}else{
								player2.sante -= player1.arme.puissance*40/100;
							}
							
						}else{
							player2.sante -= player1.arme.puissance/2;
						}
					}
					majAffichage();
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
		context.lineWidth = 3 ;
		context.arc(this.x*tailleCase + tailleCase/2 , this.y*tailleCase + tailleCase/2 , tailleCase/2 - 2 ,0,2*Math.PI);
		context.stroke();
		context.fillStyle = "white";
		context.font= "20px Georgia";
		context.fillText( this.id , this.x*tailleCase + 25 , this.y*tailleCase + 27);
	};
}

var player1 = new Player(1 , 
	prompt("Quel est le nom du joueur 1?") , 
	Math.floor( Math.random() * taillePlateau ) , 
	Math.floor( Math.random() * taillePlateau ) ,
	pistolet ,
	100,
	"blue")
;
var player2 = new Player(2 , 
	prompt("Quel est le nom du joueur 2?") , 
	Math.floor( Math.random() * taillePlateau ) , 
	Math.floor( Math.random() * taillePlateau ) ,
	pistolet ,
	100,
	"red")
;