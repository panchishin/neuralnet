# neuralnet - an Artificial Neural Net


[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Auto Test Status][travis-image]][travis-url] [![Gitter chat][gitter-image]][gitter-url] 

An implementation of the classic Artificial Neural Net with back propogation learning.

# Usage

## NeuralNet construction and configuration

Super-minimalistic configuration which works in most cases:
```js
var config = {
	inputs 				: numberOfInputs , 
	outputs				: numberOfOutputs
}
var neuralnet = require('neuralnet')( config );
```

If you need more control there are a few more configuration options you can set like so:
```js
var config = {
	inputs 				: numberOfInputs , 			// required
	hiddenLayers 		: numberOfHiddenLayers , 	// default 1
	hiddenNodesPerLayer : numberOfNodesPerLayer , 	// defaults to inputs * 5
	outputs				: numberOfOutputs , 		// default 1
	learningRate		: learningRate				// defaults to inputs
}
var neuralnet = require('neuralnet')( config );
```

That creates one instance of a NeuralNet calculator which uses the initial configuration you supply.  Other than 'inputs' all configuration options are optional.


*Implementation Note* : There is actually an additional input beyond what you specify in the configuration which is always set to -1.  No need to add one if you were thinking of doing so, and no need to remove it because it will only help your NeuralNet.


### alphabeta.clone
Use *.clone* if you want another NeuralNet based on the configuration and learning of an existing NeuralNet.  This allows you to take a snapshot of a NeuralNet after some training and explore what would happen if it received different training without modifying the original.

```js
var anotherNeuralNet = neuralnet.clone()
```

## Execution
NeuralNet takes an array of decimal numbers, expecting it to be the size of *inputs* in length and returns an array of decimal numbers in length equal to *outputs*.  The numbers the NeuralNet takes as input is any decimal number from 0.0 to 1.0.  For output the reasonable range is more like 0.1 to 0.9.  If you want to input and output numbers outside of this range you'll need to do the mathmatical mapping.  Typically though the input is used in a binary way, either exactly 0 or exactly 1, as is the expected output for training purposes.  In this case the predicted output is rounded such that an output of 0.3 becomes 0 and similarly something like 0.6 becomes 1.

### neuralnet.predict( inputArray )

Call the prediction function like so:
```js
var inputArray = [ /* your data */ ]
var predictionArray = neuralnet.predict( inputArray )
```


### neuralnet.train( inputArray , expectedOutputArray )
Use backpropogation to train the neural net like so:
```js
var inputArray = [ /* your data */ ]
var expectedOutputArray = [ /* the expected output */ ]
var actualPredictionArray = neuralnet.train(inputArray,expectedOutputArray)
```

# Example

If you have included NeuralNet as a node package then first change directory to *node_packages/neuralnet*

## Greyscale example of Multiplication
Greyscale means using the actual output as it is and not converting it to a true/false.  This example shows that the numeric value of the output can be fairly precise as an estimator, not just a boolean operation.
```
node example/multiply.js
```

## Boolean example of Rock Paper Sissors
Boolean operations is the classic use of Neural Nets, either fire or don't fire.  In this example the Neural Net learns which player should win in a game of Rock Paper Sissors.
```
node example/rock_paper_sissors.js
```

# Errata

## neuralnet.layers

You can inspect and modify the data in the layers by accessing the layers, although there probably isn't a need.
```js
	var layers = neuralnet.layers
```


# References

* [Instructor: Patrick Winston from MIT](https://www.youtube.com/watch?v=q0pm3BrIUFo)
* [Wikipedia entry for Artificial Neural Networks](https://en.wikipedia.org/wiki/Artificial_neural_network)


[gitter-url]: https://gitter.im/panchishin/neuralnet
[gitter-image]: https://badges.gitter.im/panchishin/neuralnet.png
[downloads-image]: http://img.shields.io/npm/dm/neuralnet.svg

[npm-url]: https://npmjs.org/package/neuralnet
[npm-image]: http://img.shields.io/npm/v/neuralnet.svg

[travis-url]: https://travis-ci.org/panchishin/neuralnet
[travis-image]: http://img.shields.io/travis/panchishin/neuralnet.svg

