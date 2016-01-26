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

var equal = true
var neuralNetConfig = {
	inputs 	: SIZE*SIZE ,
	outputs	: SIZE*SIZE ,
	hiddenNodesPerLayer : SIZE*SIZE ,
	hiddenLayers : 1 ,
	filterTraining :	function ( output , expected ) {
		var equal = true
		for( var i = 0 ; i < expected.length && equal ; i++ ) {
			equal = ( Math.round( expected[i] ) == Math.round( output[i] ) )
		}
		return !equal
	}
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

function train(learningRate) {
	var input = createImage()
	var expected = rotateImage(input)
	neuralnet.train(input,expected,learningRate)
	return !equal

}

var session = 0
var accuracy = 0
var best = 0
var learningRate = neuralnet.learningRate()
var lambda = 0.01
var target = ( 1 - lambda * 2 )
while(  accuracy < target ) {
	accuracy = accuracy * ( 1 - lambda ) + ( train(learningRate) ? 0 : lambda )
	if ( session % 250 == 0 ) {
		console.log("Completed " + session + " training sessions with a rolling accuracy of " + Math.round( accuracy * 100 ) + "% and learningRate of " + learningRate )
//		printPrediction()
	} 
	session++
	if ( accuracy < best - lambda * 2 ) {
		learningRate *= ( 1 - lambda )
		best = accuracy
	} else {
		best = accuracy > best ? accuracy : best
	}
}
console.log("\nCompleted " + session + " training sessions with a rolling accuracy of " + Math.round( accuracy * 100 ) + "% and learningRate of " + Math.round( learningRate * 100 ) + "%" )
// printPrediction()

console.log("\nHere are some example rotations after training")
printPrediction()
printPrediction()
printPrediction()


