var sampleInput = [ 1 , 0 , 1 , 1 ]
var sampleOutput = [ 0 , 1 , 1 ]

var neuralNetConfig = {
	inputs 	: sampleInput.length ,
	outputs	: sampleOutput.length ,
	learningRate : 10	/* change a lot */
}

var neuralnet = require("../neuralnet.js")(neuralNetConfig)

neuralnet.train( sampleInput , sampleOutput )


console.log("\nThe correct result output is : " + sampleOutput )
var predicted = neuralnet.predictBoolean( sampleInput )
console.log("After 1 training sessions, the boolean prediction is : " + predicted )
predicted = neuralnet.predict( sampleInput )
console.log("And the grayscale prediction is : " + predicted + "\n" )
