
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url] 

An implementation of the classic Artificial Neural Net with back propagation learning.

# Usage

## NeuralNet construction and configuration

### neuralnet = require('neuralnet')( config )
Super-minimalistic configuration which works in most cases:
```js
var config = {
	inputs 				: numberOfInputs , 
	outputs				: numberOfOutputs
}
var neuralnet = require('neuralnet')( config );
```
That is all the configuration you need to get started.  Jump to [the Execution section](#execution) for the [prediction](#neuralnetpredict-inputarray) and [training](#neuralnettrain-inputarray-expectedoutputarray) functions.
-----
#### Full Config
If you need more control there are a few more configuration options you can set like so:
```js
var config = {
	inputs 				: numberOfInputs , 			// defaults to 2
	hiddenLayers 		: numberOfHiddenLayers , 	// defaults to 1
	hiddenNodesPerLayer : numberOfNodesPerLayer , 	// defaults to inputs * 5
	outputs				: numberOfOutputs , 		// defaults to inputs
	learningRate		: learningRate				// defaults to 1
}
var neuralnet = require('neuralnet')( config );
```
That creates one instance of a NeuralNet calculator which uses the initial configuration you supply.  Other than 'inputs' all configuration options are optional.

*Implementation Note* : There is actually an additional input beyond what you specify in the configuration which is always set to -1.  No need to add one if you were thinking of doing so, and no need to remove it because it will only help your NeuralNet.

### neuralnet.clone( )
Use *.clone* if you want another NeuralNet based on the configuration and learning of an existing NeuralNet.  This allows you to take a snapshot of a NeuralNet after some training and explore what would happen if it received different training without modifying the original.
```js
var aTotalCloneNeuralNet = existingNeuralNet.clone()
```

### neuralnet.new( )
use *.new* if you want a new untrained NeuralNet with the same configuration as another NeuralNet.  This is different than clone which copies over all the training.  *.new* leaves the original NeuralNet unchanged.
```js
var aFreshUntrainedNeuralNet = existingNeuralNet.new()
```
### neuralnet.new( config )
A short cut for require('neuralnet')( config ) once you have a NeuralNet.
```js
var aFreshUntrainedNeuralNet = existingNeuralNet.new( config )
```

### neuralnet.learningRate( )
Retrieve the learning rate of this NeuralNet.
```js
var whatsMyLearningRate = neuralnet.learningRate()
```

### neuralnet.learningRate( newLearningRate )
Change the learning rate of this NeuralNet.  It returns the value set if it is a legal value otherwise it returns the previously set configuration.
```js
var shouldEqualFive = neuralnet.learningRate(5)
```
### neuralnet.config( )
Retrieve a copy of the complete configuration that this NeuralNet uses.  Perhaps you want see what happens with an additional hidden layer.  No problem, you can do that like so:
```js
var config = neuralnet.config()
config.numberOfHiddenLayers++
var thickerNeuralNet = neuralnet.new(config)
```

## Execution
NeuralNet takes an array of decimal numbers, expecting it to be the size of *inputs* in length and returns an array of decimal numbers in length equal to *outputs*.  The numbers the NeuralNet takes as input is any decimal number from 0.0 to 1.0.  For output the reasonable range is more like 0.1 to 0.9.  If you want to input and output numbers outside of this range you'll need to do the mathmatical mapping.  Typically though the input is used in a binary way, either exactly 0 or exactly 1, as is the expected output for training purposes.

### neuralnet.predict( inputArray )

Predicts the output with grayscale (floating point) numbers.  Call the prediction function like so:
```js
var inputArray = [ /* your data */ ]
var predictionArray = neuralnet.predict( inputArray )
```
An example grayscale predictionArray is : [ 0.223 , 0.118 , 0.734 ]
Think of the grayscale prediction as a confidence score where 0.5 represents "I really don't know between 'no' (0.0) and 'yes' (1.0)".  The closer the score is to either 0.0 or 1.0 the more confident it is.  This could allow you to use the grayscale for more than a binary, yes or no, response.  For example, you could use values of 0.0 to 0.25 as 'no', 0.75 to 1.00 as 'yes', and 0.25 to 0.75 as 'I am uncertain'.

### neuralnet.predictBoolean( inputArray )

Same as neuralnet.predict but changes grayscale values into booleans
```js
var inputArray = [ /* your data */ ]
var predictionArray = neuralnet.predictBoolean( inputArray )
```
An example boolean predictionArray is : [ 0 , 0 , 1 ]
The boolean prediction is simply the greyscale prediction passed through Math.round().

### neuralnet.train( inputArray , expectedOutputArray )
Use backpropogation to train the neural net.  It also returns a prediction.  Use it like so:
```js
var inputArray = [ /* your data */ ]
var expectedOutputArray = [ /* the expected output */ ]
var actualPredictionArray = neuralnet.train(inputArray,expectedOutputArray)
```
You can optionally override the learningRate for one training session like so:
```js
neuralnet.train( inputArray , expectedOutputArray , learningRate )
```
Use this to change the learning rate on a case by case basis if you have some indicator of how much weight a specific learnt item should have.  Think of it as shocking the student.  It can seriously speed up learning but at the cost of overfitting.  Use like so:
```js
var inputArray = [ /* your data */ ]
var expectedOutputArray = [ /* the expected output */ ]
var learningRate = 5 // set the learning rate to 5 times default.
var actualPredictionArray = neuralnet.train(
								inputArray,
								expectedOutputArray,
								learningRate
							)
```
# Example

If you have included NeuralNet as a node package then first change directory to *node_packages/neuralnet*

## Template
A simple template which has one input array, one training output array, and trains the NeuralNet once.
```
node example/template.js
```

## Rock Paper Sissors (Boolean example)
Boolean operations is the classic use of Neural Nets, either fire or don't fire.  In this example the Neural Net learns the rules of the game of Rock Paper Sissors.
```
node example/rock_paper_sissors.js
```

## Multiplication (Grayscale example)
Grayscale means using the actual output as it is and not converting it to a true/false.  This example shows that the numeric value of the output can be fairly precise as an estimator, not just a boolean operation.
```
node example/multiply.js
```


# Misc

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

[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://tldrlegal.com/license/mit-license