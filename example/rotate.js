console.log("Learn to rotate a 4x4 image by 90 degrees")

function createImage() {
	var image = []
	for( var index = 0 ; index < 4*4 ; index++ ) {
		image.push( ( Math.random() > .8 ? 1 : 0 ) )
	}
	return image
}

function rotateImage( image ) {
	var result = []
	for( var x = 0 ; x < 4 ; x++ ) for( var y = 0 ; y < 4 ; y++ ) {
		result.push( image[ (3-y)*4 + x ] )
	}
	return result
}

function printImages( images ) {
	for( var row = 0 ; row < 4 ; row++ ) {
		for( var image in images ) {
			process.stdout.write("  | ")
			for( var column = 0 ; column < 4 ; column++ ) {
				process.stdout.write( images[image][ row * 4 + column ] ? "X " : "+ " )
			}
			process.stdout.write("|")
		}
		process.stdout.write("\n")
	}
}

var neuralNetConfig = {
	inputs 	: 16 ,
	outputs	: 16 ,
	numberOfHiddenLayers : 2
}

var neuralnet = require("../neuralnet.js")(neuralNetConfig)

function printPrediction() {
	var input = createImage()
	var expected = rotateImage(input)
	var predicted = neuralnet.predictBoolean(input)
	console.log("\n   Input        Expected     Predicted")
	printImages([input,expected,predicted])
	if ( JSON.stringify(expected) == JSON.stringify(predicted) ) {
		console.log("                             CORRECT")
	} else {
		console.log("                             *WRONG*")
	}
}

function train() {
	var input = createImage()
	var expected = rotateImage(input)
	neuralnet.train(input,expected)
}

var session = 0
while( session < 1000 ) {
	train()
	if ( session % 250 == 0 ) {
		console.log("\nCompleted " + session + " training sessions")
		printPrediction()
	} 
	session++
}
console.log("\nCompleted " + session + " training sessions")
printPrediction()

console.log("\nHere are some example rotations after training")
printPrediction()
printPrediction()
printPrediction()


