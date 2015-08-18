var sampleInput = [ 1 , 0 , 1 , 1 ]
var sampleOutput = [ 0 , 1 , 1 ]

var neuralNetConfig = {
	inputs 	: sampleInput.length ,
	outputs	: sampleOutput.length ,
	learningRate : 10	/* change a lot */
}

var neuralnet = require("../neuralnet.js")(neuralNetConfig)

neuralnet.train( sampleInput , sampleOutput )

var predicted = neuralnet.predict( sampleInput )

for( var index in predicted ) {
	predicted[index] = Math.round(predicted[index])
}

console.log("\nThe correct result output is : " + sampleOutput )
console.log("After 1 training sessions, the prediction is : " + predicted + "\n" )

