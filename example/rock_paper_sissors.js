
console.log("\nTest the learning capabilities of an Artificial Neural Net by learning the rules of Rock Paper Sissors. There are 3 boolean inputs (rock, paper, sissors) for each player, and 1 boolean output (win/no win) for each.")

var ROCK = 0 , PAPER = 1 , SISSORS = 2

var config = {
	inputs 				: 6 ,
	hiddenNodesPerLayer	: 4 ,	/* these are simple rules */
	outputs				: 2
}

console.log("The config is " + JSON.stringify(config))

var neuralnet = require("../neuralnet.js")(config)

function random() { 
	return Math.min(2,Math.max(0,(Math.round(Math.random()*3-0.5))))
}

function createInputs(player1,player2) {
	var result = [ 0 , 0 , 0 , 0 , 0 , 0 ]
	result[player1] = 1
	result[3+player2] = 1
	return result
}

function createOutputs(player1,player2) {
	if ( player1 == ROCK && player2 == PAPER ) {
		return [ 0 , 1 ]
	} else if ( player1 == ROCK && player2 == SISSORS ) {
		return [ 1 , 0 ]
	} else if ( player1 == PAPER && player2 == ROCK ) {
		return [ 1 , 0 ]
	} else if ( player1 == PAPER && player2 == SISSORS ) {
		return [ 0 , 1 ]
	} else if ( player1 == SISSORS && player2 == PAPER ) {
		return [ 1 , 0 ]
	} else if ( player1 == SISSORS && player2 == ROCK ) {
		return [ 0 , 1 ]
	} else {
		return [ 0 , 0 ]
	}
}

function doOneTraining() {
	for( var a = 0 ; a < 3 ; a ++)
		for( var b = 0 ; b < 3 ; b ++)
			neuralnet.train( createInputs(a,b) , createOutputs(a,b) )
}


function example() {

	var choices = [" ROCK  " , " PAPER " , "SISSORS"]

	function print(num) {
		return "'"+Math.round(num * 100)+"'"
	}

	for( var a = 0 ; a < 3 ; a ++)
	for( var b = 0 ; b < 3 ; b ++) {

	var inputs = createInputs(a,b)
	var predicted = neuralnet.predict( inputs )
	predicted[0] = Math.round( predicted[0] )
	predicted[1] = Math.round( predicted[1] )
	predicted = JSON.stringify(predicted)
	var expected = JSON.stringify(createOutputs(a,b))

	console.log(
		choices[a]+" vs "+ choices[b] +
		" expect "+expected+
		" and was "+predicted+
		" which is " + ( expected == predicted ? "correct" : "INCORRECT" )
		)
	}
}

console.log("\nPrior to training, here is how it preforms:\n")
example()


var TRAINING = 500

console.log("\n=== Training starts ===");
for( var count = 0 ; count < TRAINING ; count ++) {
	doOneTraining()
	if ( count % 20 == 0 ) { process.stdout.write(".") }
}
console.log("\n=== Training ends ===");

console.log("\nHere is how it preforms after training "+TRAINING+" iterations:\n")
example()

console.log()