
console.log("\nTest the learning capabilities of an Artificial Neural Net");
console.log("\nTrain a neural net to predict the outcome of this calculation");
console.log(" A * B / 2  , where A and B are a decimal between 0 and 1.\n");


var config = {
	inputs 				: 2 , 
	hiddenLayers 		: 1 , 
	hiddenNodesPerLayer : 5 ,
	outputs				: 1 ,
	learningRate		: 1
}

var neuralnet = require("../neuralnet.js")(config)

function doOneTraining() {
	var a = Math.random()
	var b = Math.random()

	neuralnet.train( [ a , b , -1 ] , [ a * b / 2 ] )
}

function doOnePredictionAndGetError() {
	var a = Math.random()
	var b = Math.random()

	var result =  neuralnet.predict( [ a , b , -1 ] )[0] - (a * b / 2)
	return result
}

var SAMPLES = 100
var TRAINING = 10

function calculateAverageError() {
	var error = 0;
	for( var count = 0 ; count < SAMPLES ; count ++) {
		error += doOnePredictionAndGetError();
	}
	return error / SAMPLES;
}

console.log(Math.round( calculateAverageError() * 100 ) + "% : The initial average error" )
for( var rounds = 0 ; rounds < 10 ; rounds++ ) {
	for( var count = 0 ; count < TRAINING ; count ++) {
		doOneTraining()
	}
	console.log(Math.round( calculateAverageError() * 100 ) + "% : average error after " + TRAINING * (rounds + 1) + " training sessions")
}

console.log()