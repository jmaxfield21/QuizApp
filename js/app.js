$(document).ready( function() {
	
	$('#start').click( startQuiz );

	$('form').submit( saveResult );

});


// Save the user's answers
var answer1;
var answer2;
var answer3;
var answer4;
var answer5;

var slideCounter = 0;
var currentSlide;
// var nextSlide;

// Map of all possible answers
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

var question1options = ['busby', 'ferguson', 'hughes', 'charlton'];
var question2options = ['teddy', 'david', 'andy', 'ole'];
var question3options = ['best', 'charlton', 'cantona', 'giggs'];
var question4options = ['schalke', 'fenerbahce', 'napoli', 'barcelona'];
var question5options = ['anfield', 'highbury', 'stamford', 'trafford'];

var correct1 = 'ferguson';
var correct2 = 'teddy';
var correct3 = 'giggs';
var correct4 = 'fenerbahce';
var correct5 = 'trafford';

var question1Obj = new Question( 'Who is this man?', question1options, correct1, 'question1', 'question1form' );
var question2Obj = new Question( 'In the 1999 Champion\'s League Final, Manchester United' 
								+ ' overcame a 1-0 deficit to win 2-1 in the final 2 minutes of added time.' 
								+ ' Who scored the equalizing goal?', question2options, correct2, 'question2', 'question2form' );
var question3Obj = new Question( 'What Manchester United player is referred to as the \'most decorated\' in English Football?', 
								question3options, correct3, 'question3', 'question3form' );
var question4Obj = new Question( 'Wayne Rooney debuted for Manchester United at age 18 in the Champion\'s League.' 
								+ ' Against which team did he score is debut hat-trick?', question4options, correct4, 'question4', 'question4form' );
var question5Obj = new Question( 'Manchester United\'s stadium holds over 70,000 people and is nicknamed ' 
								+ '\'The Theatre of Dreams\'. What is it\'s real name?', question5options, correct5, 'question5', 'question5form' );

var quizQuestions = [question1Obj, question2Obj, question3Obj, question4Obj, question5Obj];

function Question( question, answersArray, correctAnswer, questionCss, formCss ) {
	this.question = question;
	this.answersArray = answersArray;
	this.correctAnswer = correctAnswer;
	this.questionCss = questionCss;
	this.formCss = formCss;
	this.questionSelector = function() {
		return '.' + this.questionCss;
	};
}

function startQuiz() {
	$('.main').fadeOut(1000);
	prepareSlide();
	$(getCurrentSlide().questionSelector()).delay(1025).fadeIn();
}


function saveResult( event ) {
	event.preventDefault();
	if ( !$('input:radio', this).is(':checked')) {
		alert('Please select an answer to continue!');
		return;
	}
	saveResponse( event );
	nextQuestion();
}

function saveResponse( event ) {
	if ( event.currentTarget.id == 'question1form' ) {
		answer1 = getInput();
	} else if ( event.currentTarget.id == 'question2form' ) {
		answer2 = getInput();
	} else if ( event.currentTarget.id == 'question3form' ) {
		answer3 = getInput();
	} else if ( event.currentTarget.id == 'question4form' ) {
		answer4 = getInput();
	} else if ( event.currentTarget.id == 'question5form' ) {
		answer5 = getInput();
	} else {
		alert('An unexpected error occurred.');
	}
}

function getInput() {
	return $('input[name=q]:checked').val();
}

function nextQuestion() {
	$(getCurrentSlide().questionSelector()).fadeOut(1000);
	slideCounter++;
	if ( slideCounter >= 5 ) {
		getReviewData();
		$('#score').text( calculateScore() + '%');
		setTimeout(prepareSlide, 1000);
		$('.review').delay(1000).fadeIn();
	} else {
		setTimeout(prepareSlide, 1000);
		$( getCurrentSlide().questionSelector() ).delay(1000).fadeIn();
	}
}

function prepareSlide() {
	if ( slideCounter > 0 ) var prevSlide = quizQuestions[slideCounter - 1];
	if ( prevSlide != null ) removePreviousSlide( prevSlide );
	setCurrentSlide( quizQuestions[slideCounter] );
	if ( slideCounter < 5 ) {
		$('.question').addClass( getCurrentSlide().questionCss );
		$('#question-text').text( getCurrentSlide().question );
		$('form').attr( 'id', getCurrentSlide().formCss );
		createForm();
	}
}

function removePreviousSlide( previousSlide ) {
	$('.question').removeClass( previousSlide.questionCss );
	$('form').removeAttr( 'id', previousSlide.formCss );
	$('form').empty();
}

function createForm() {
	var arr = getCurrentSlide().answersArray;
	for ( var i = 0; i < arr.length; i++ ) {
		$('form').append('<input type="radio" name="q" ' 
			+ ' value="' + arr[i] + '">' + getAnswerValue(arr[i]) + '<br>')
	}
	$('form').append('<button type="submit" class="button">Submit</button>');
}

function setCurrentSlide( slide ) {
	currentSlide = slide;
}

function getCurrentSlide() {
	return currentSlide;
}

function getReviewData() {
	$('.answer1').text( getAnswerValue( answer1 ) );
	$('.answer2').text( getAnswerValue( answer2 ) );
	$('.answer3').text( getAnswerValue( answer3 ) );
	$('.answer4').text( getAnswerValue( answer4 ) );
	$('.answer5').text( getAnswerValue( answer5 ) );
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