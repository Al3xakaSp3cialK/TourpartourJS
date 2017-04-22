// Complet
function Plateau (taillePlateau , tailleCase) {

	this.taille = taillePlateau;
	this.couleur = "#2020B2";
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