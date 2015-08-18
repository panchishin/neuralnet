
console.log("\nTest the learning capabilities of an Artificial Neural Net");
console.log("\nTrain a neural net to predict the outcome of this calculation");
console.log(" A * B , where A and B are a decimal between 0.15 and 0.85.\n");



var config = {
	inputs 				: 2 , 
	outputs				: 1
}

var neuralnet = require("../neuralnet.js")(config)

function random() { return (Math.random() * 0.7) + 0.15 }

function doOneTraining() {
	var a = random()
	var b = random()

	neuralnet.train( [ a , b ] , [ a * b ] )
}

function doOnePredictionAndGetError() {
	var a = random()
	var b = random()

	return neuralnet.predict( [ a , b ] )[0] - (a * b )
}

var TRAINING = 1000

function calculateAverageError() {
	var SAMPLES = 100

	var error = 0;
	for( var count = 0 ; count < SAMPLES ; count ++) {
		error += Math.pow( doOnePredictionAndGetError() , 2);
	}
	return Math.pow( error / SAMPLES , 0.5);
}

console.log("\nBefore training.  Here are some example attempts of the NeuralNet:\n");

for(var count=0 ; count<5 ; count++) {
	example()
}

console.log("\n=== Training starts ===");
for( var rounds = 0 ; rounds < 10 ; rounds++ ) {
	for( var count = 0 ; count < TRAINING ; count ++) {
		doOneTraining()
	}
	process.stdout.write(".")
}
console.log("\n=== Training ends ===");

console.log("\nTraining complete.  Here are some example attempts of the NeuralNet:\n")


function example() {

	function print(num) {
		return "'"+Math.round(num * 100)+"'"
	}

	var a = random()
	var b = random()

	var predicted = neuralnet.predict( [ a , b ] )
	var expected = (a * b)

	console.log("Given A = "+print(a)+" and B = "+print(b)+
		" and an expected result of (A x B) of " +print(expected)+
		", the NN got " + print(predicted) + " , an error of "+print(Math.abs(predicted-expected)))

}

for(var count=0 ; count<5 ; count++) {
	example()
}