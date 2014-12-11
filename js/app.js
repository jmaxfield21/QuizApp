$(document).ready( function() {
	
	$('#start').click( startQuiz );

	$('form').submit( saveResult );

});

var correct1 = 'ferguson';
var correct2 = 'teddy';
var correct3 = 'giggs';
var correct4 = 'fenerbahce';
var correct5 = 'trafford';

var answer1;
var answer2;
var answer3;
var answer4;
var answer5;

var answerMap = {};
answerMap['busby'] 		= 'Sir Matt Busby';
answerMap['ferguson'] 	= 'Sir Alex Ferguson';
answerMap['hughes'] 	= 'Mark Hughes';
answerMap['charlton'] 	= 'Sir Bobby Charlton';
answerMap['teddy']		= 'Teddy Sheringham';
answerMap['david']		= 'David Beckham';
answerMap['andy']		= 'Andy Cole';
answerMap['ole']		= 'Ole Gunnar Solskjaer';
answerMap['best']		= 'George Best';
answerMap['cantona']	= 'Eric Cantona';
answerMap['giggs']		= 'Ryan Giggs';
answerMap['schalke']	= 'FC Schalke';
answerMap['fenerbahce']	= 'Fenerbahce';
answerMap['napoli']		= 'Napoli';
answerMap['barcelona']	= 'FC Barcelona';
answerMap['anfield']	= 'Anfield';
answerMap['highbury']	= 'Highbury';
answerMap['stamford']	= 'Stamford Bridge';
answerMap['trafford']	= 'Old Trafford';

var currentSlide;
var nextSlide;

function startQuiz() {
	$('.main').fadeOut(1000);
	$('.question1').delay(1025).fadeIn();
	setCurrentSlide('.question1');
}

function saveResult( event ) {
	event.preventDefault();
	saveResponse( event );
	nextQuestion();
}

function saveResponse( event ) {
	if ( event.currentTarget.id == 'question1form' ) {
		answer1 = getInput('manager');
	} else if ( event.currentTarget.id == 'question2form' ) {
		answer2 = getInput('equalizer');
	} else if ( event.currentTarget.id == 'question3form' ) {
		answer3 = getInput('decorated');
	} else if ( event.currentTarget.id == 'question4form' ) {
		answer4 = getInput('hat-trick');
	} else if ( event.currentTarget.id == 'question5form' ) {
		answer5 = getInput('stadium');
	} else {
		alert('An unexpected error occurred.');
	}
}

function getInput(inputName) {
	return $('input[name=' + inputName + ']:checked').val();
}

function nextQuestion() {
	$(currentSlide).fadeOut(1000);
	nextSlide = getNextSlide();
	if ( nextSlide == '.review' ) {
		getReviewData();
		$('#score').text( calculateScore() + '%');
	}
	$(nextSlide).delay(1025).fadeIn();
	setCurrentSlide(nextSlide);
}

function getNextSlide() {
	var slide = getCurrentSlide();
	var val = +slide.charAt(slide.length-1);
	val += 1;
	if ( val <= 5 ) {
		return '.question' + val;
	} else {
		return '.review';
	}
}

function setCurrentSlide( slide ) {
	currentSlide = slide;
}

function getCurrentSlide() {
	return currentSlide;
}

function getReviewData() {
	$('.answer1').text( getAnswerValue( answer1) );
	$('.answer2').text( getAnswerValue( answer2) );
	$('.answer3').text( getAnswerValue( answer3) );
	$('.answer4').text( getAnswerValue( answer4) );
	$('.answer5').text( getAnswerValue( answer5) );
}

function getAnswerValue( answer ) {
	return answerMap[answer];
}

function calculateScore() {
	var score = 0;
	if ( answer1 == correct1 ) {
		score++;
	}
	if ( answer2 == correct2 ) {
		score++;
	}
	if ( answer3 == correct3 ) {
		score++;	
	}
	if ( answer4 == correct4 ) {
		score++;
	}
	if ( answer5 == correct5 ) {
		score++;
	}
	return ( score / 5 ) * 100;
}