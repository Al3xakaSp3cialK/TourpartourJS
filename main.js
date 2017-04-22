function initialize () {

	while ( player1.x == player2.x || player1.y == player2.y ) {
		player1.x = Math.floor( Math.random()* taillePlateau ) ;
		player1.y = Math.floor( Math.random()* taillePlateau ) ;
		player2.x = Math.floor( Math.random()* taillePlateau ) ;
		player2.y = Math.floor( Math.random()* taillePlateau ) ;
	}

	monPlateau.detruire();
	monPlateau.construire();

	
	tourDe = (function(){
		var debut = Math.floor(Math.random()*2);
		if (debut>=1){
			return player1.nom;
		} else {
			return player2.nom;
		}
	})();
	alert(tourDe);
	timer = setInterval(function(){
		
		afficherJoueur1.innerHTML = player1.x +" " + player1.y;
		afficherJoueur2.innerHTML = player2.x +" " + player2.y;

		if ( tourDe == player1.nom || tourDe == player2.nom ) {
			monPlateau.detruire();
			monPlateau.construire();
			play(tourDe);
			verifGameOver(player1.sante , player2.sante);
			
		} 

	},100);

	

}

initialize();