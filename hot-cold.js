$(document).ready(function(){

	var randNum = Math.floor((Math.random()*100)+1);
	$('div#main>p').text(randNum);
	var pg = [];

	/* need to capture when input form submitted with enter
	since it causes page reload and reruns everything */
	$('div#main>form>input').keypress(function(event){		
		var player_guess = $(this).val();		
		
		if(event.which == 13){
			event.preventDefault();
			function checkNum(){
				if(player_guess == randNum){
					alert('You won!');
					location.reload();
				} else {					
					if(pg.length > 9 || $('ul#cold li').size()==5){
						alert("Game Over!")
						location.reload();
					} else {
						alert('Try again!');
						if(Math.abs(player_guess-randNum)<=5){
							pg.push(player_guess)
							$('ul#hot').append('<li>' + player_guess + '</li>');
						} else {
							pg.push(player_guess)
							$('ul#cold').append('<li>' + player_guess + '</li>');
						}						
					}			
				}
			}
			return checkNum();
		}
	});
});