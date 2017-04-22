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

var pistolet = new Arme("Pistolet", imagePistolet ,10, undefined , undefined );
var fusilAssaut = new Arme("Fusil d'assaut", imageFusilAssaut ,32, Math.floor( Math.random()* taillePlateau), Math.floor( Math.random()* taillePlateau) );
var fusilPompe = new Arme("Fusil à pompe", imageFusilPompe ,35, Math.floor( Math.random()* taillePlateau ) , Math.floor( Math.random()* taillePlateau) );
var bazooka = new Arme("Bazooka", imageBazooka ,45, Math.floor( Math.random()* taillePlateau ) , Math.floor( Math.random()* taillePlateau) );
