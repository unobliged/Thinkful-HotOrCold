$(document).ready(function(){

	var randNum = Math.floor((Math.random()*100)+1);
	$('div#main>p').text(randNum);
	var pg = [];
	var prev_dif;

	function warmer(dif, player_guess){		
		var bound;
		
		if(dif > 6 && dif <= 25){
			$('div#main>h3').text(player_guess + ' is WARM! ').effect("pulsate");
			bound = 25;
		} else if(dif <=5){
			$('div#main>h3').text(player_guess + ' is HOT! ').effect("pulsate");
			bound = 5;
		} else {
			$('div#main>h3').text(player_guess + ' is COLD! ').effect("pulsate");
			bound = 25;
		}
		
		if(player_guess > randNum){
			$('div#main>h3').append('Try guessing within ' + bound + ' lower.');
		} else {
			$('div#main>h3').append('Try guessing within ' + bound + ' higher.');
		}
		
		if(pg.length !== 0){		
			if(prev_dif > dif){				
				$('div#main>h4').text('Also, your guess is better than before!').effect("pulsate");
			} else {
				$('div#main>h4').text('Also, your guess is worse than before!').effect("pulsate");
			}
		} else {
			prev_dif = dif;
		}
		
		prev_dif = dif;	
	}
	
	function checkNum(player_guess){
		if(player_guess == randNum){
			alert('You won!');			
			location.reload();
		} else {					
			if(pg.length > 9 || $('ul#cold li').size()==5){
				alert("Game Over!")
				location.reload();
			} else {
				if(Math.abs(player_guess-randNum)<=5){					
					pg.push(player_guess)
					$('ul#hot').append('<li>' + player_guess + '</li>');				
				} else {
					pg.push(player_guess)
					$('ul#cold').append('<li>' + player_guess + '</li>');
				}
				$('div#main>form>input').val("");
			}		
		}
	}

	/* need to capture when input form submitted with enter
	since it causes page reload and reruns everything */
	$('div#main>form>input').keypress(function(event){		
		var player_guess = $(this).val();			
		var dif = Math.abs(player_guess-randNum);
		if(event.which == 13){
			event.preventDefault();
			if(isNaN(player_guess) || player_guess >100 || player_guess < 1){
				alert("Please input a valid number");
				$('div#main>form>input').val("");
			} else {				
				warmer(dif, player_guess);
				checkNum(player_guess);
			}
		}
	});
	
	
});