var SIZE = 4
if ( process.argv[2] ) {
	SIZE = process.argv[2]
}

console.log("Learn to rotate a "+SIZE+"x"+SIZE+" image by 90 degrees")

function createImage() {
	var image = []
	for( var index = 0 ; index < SIZE*SIZE ; index++ ) {
		image.push( ( Math.random() > (1 - 1/SIZE) ? 1 : 0 ) )
	}
	return image
}

function rotateImage( image ) {
	var result = []
	for( var x = 0 ; x < SIZE ; x++ ) for( var y = 0 ; y < SIZE ; y++ ) {
		result.push( image[ (SIZE-1-y)*SIZE + x ] )
	}
	return result
}

function printImages( images ) {
	for( var row = 0 ; row < SIZE ; row++ ) {
		for( var image in images ) {
			process.stdout.write("  | ")
			for( var column = 0 ; column < SIZE ; column++ ) {
				process.stdout.write( images[image][ row * SIZE + column ] ? "X " : "  " )
			}
			process.stdout.write("|")
		}
		process.stdout.write("\n")
	}
}

var neuralNetConfig = {
	inputs 	: SIZE*SIZE ,
	outputs	: SIZE*SIZE ,
	hiddenNodesPerLayer : SIZE*SIZE ,
	hiddenLayers : 1
}

var neuralnet = require("../neuralnet.js")(neuralNetConfig)

var WHITE = "                                                                       "

function printPrediction() {
	var input = createImage()
	var expected = rotateImage(input)
	var predicted = neuralnet.predictBoolean(input)
	console.log("\n   Input" + WHITE.substr(0,SIZE*2) + "Expected" + WHITE.substr(0,SIZE*2-3) + "Predicted")
	printImages([input,expected,predicted])
	if ( JSON.stringify(expected) == JSON.stringify(predicted) ) {
		console.log(WHITE.substr(0,SIZE*4+13) + "CORRECT")
	} else {
		console.log(WHITE.substr(0,SIZE*4+13) + "*WRONG*")
	}
}

function train() {
	var input = createImage()
	var expected = rotateImage(input)
	neuralnet.train(input,expected)
}

var session = 0
while( session < 100*SIZE*SIZE ) {
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


