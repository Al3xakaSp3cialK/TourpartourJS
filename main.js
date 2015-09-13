function initialize () {

	if ( player1.x == player2.x && player1.y == player2.y) {
		player1.x = 3 ;
		player1.y = 3 ;
		player2.x = 3 ;
		player2.y = 3 ;
	}

	monPlateau.detruire();
	monPlateau.construire();

	
	tourDe = prompt("Qui commence?");

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