
console.log("\nTest the learning capabilities of an Artificial Neural Net by learning the rules of Rock Paper Sissors. There are 3 boolean inputs (rock, paper, sissors) for each player, and 1 boolean output (win/no win) for each.")

var ROCK = 0 , PAPER = 1 , SISSORS = 2

var config = {
	inputs 				: 6 ,
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
	var allequal = true
	for( var a = 0 ; a < 3 ; a ++)
		for( var b = 0 ; b < 3 ; b ++) {
			var actual = neuralnet.predict( createInputs(a,b) )
			var expected = createOutputs(a,b)
			var equal = true
			for( var index = 0 ; index < expected.length && equal ; index++) {
				equal = Math.round(actual[index]) == Math.round(expected[index])
			}
			if ( !equal ) {
				neuralnet.train( createInputs(a,b) , createOutputs(a,b) )
			}
			allequal = allequal && equal
		}
	return allequal
}


function example() {

	var choices = [" ROCK  " , " PAPER " , "SISSORS"]

	function print(num) {
		return "'"+Math.round(num * 100)+"'"
	}

	for( var a = 0 ; a < 3 ; a ++)
	for( var b = 0 ; b < 3 ; b ++) {

	var inputs = createInputs(a,b)
	var predicted = neuralnet.predictBoolean( inputs )
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


var TRAINING = 1000

console.log("\n=== Training starts ===");
for( var count = 0 ; count < TRAINING && !doOneTraining() ; count ++) {
	if ( count % 20 == 0 ) { process.stdout.write(".") }
}
console.log("\n=== Training ends ===");

console.log("\nHere is how it preforms after training "+count+" iterations:\n")
example()

console.log()
