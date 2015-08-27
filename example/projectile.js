
console.log("\nTest the learning capabilities of an Artificial Neural Net")
console.log("\nTrain a neural net to predict the motion of a projectile.")

var config = {
	inputs 	: 3 ,  // inputs are the change in height for time now, -1, and -2
	outputs	: 1 ,  // the output is the expected change in height
}

var neuralnet = require("../neuralnet.js")(config)

function random() { return (Math.random() * 0.7) + 0.15 }

function projectile( startVelocity , startGravity , time ) {
	time = time / 2
	return startVelocity*time - startGravity*time*time/2
}

function change( startVelocity , startGravity , time1 , time2 ) {
	return projectile( startVelocity , startGravity , time1 ) -
		projectile( startVelocity , startGravity , time2 ) 
}

function doOneTraining() {
	var startVelocity = Math.random() * 10 + 10
	var startGravity = Math.random() * 10 + 5 // 9.8 is earth gravity
	var time = Math.random() 

	neuralnet.train( [ 
		change( startVelocity , startGravity , time    , time - .1 ) ,
		change( startVelocity , startGravity , time -.1, time - .2 ) ,
		change( startVelocity , startGravity , time -.2, time - .3 )
	] , [
		change( startVelocity , startGravity , time + .1 , time ) 
	])
}

function doOnePredictionAndGetError() {
	var startVelocity = Math.random() * 10 + 10
	var startGravity = Math.random() * 10 + 5 // 9.8 is earth gravity
	var time = Math.random() * 10

	return neuralnet.predict( [ 
		change( startVelocity , startGravity , time , time - 1 ) ,
		change( startVelocity , startGravity , time , time - 2 ) ,
		change( startVelocity , startGravity , time , time - 3 )
		] )[1] - 
		change( startVelocity , startGravity , time + 1 , time ) 

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

	var startVelocity = Math.random() * 10 + 10
	var startGravity = Math.random() * 10 + 5 // 9.8 is earth gravity
	var time = Math.random() 

	var prediction = neuralnet.predict( [ 
		change( startVelocity , startGravity , time , time - .1 ) ,
		change( startVelocity , startGravity , time -.1, time - .2 ) ,
		change( startVelocity , startGravity , time -.2, time - .3 )
		] )[0] 

	var expected = change( startVelocity , startGravity , time + .1 , time ) 

	console.log("Given starting velocity " +
		startVelocity + " and gravity " + startGravity + " after " + time + 
		" seconds\n the change in height is " + print(expected) + " the NN got " + 
		print(prediction) + " , an error of "+print(Math.abs(prediction-expected))
	)

}

for(var count=0 ; count<5 ; count++) {
	example()
}
