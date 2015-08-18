# neuralnet - an Artificial Neural Net


[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Auto Test Status][travis-image]][travis-url] [![Gitter chat][gitter-image]][gitter-url] 

An implementation of the classic Artificial Neural Net with back propogation learning.

# Usage

## NeuralNet construction and configuration

Construct a NeuralNet calculator like so:

```js
var config = {
	inputs 				: numberOfInputs , 
	hiddenLayers 		: numberOfHiddenLayers , 
	hiddenNodesPerLayer : numberOfNodesPerHiddenLayer ,
	outputs				: numberOfOutputs ,
	learningRate		: learningRate
}
var neuralnet = require('neuralnet')( config );
```

That creates one instance of a NeuralNet calculator which uses the initial configuration you supply.  All configuration options are optional.

*Implementation Note* : There is actually an additional input beyond what you specify in the configuration which is always set to -1.  No need to add one if you were thing of doing so and no need to remove it because it will only help your NeuralNet.

### neuralnet.layers

You can inspect and modify the data in the layers by accessing the layers, although there probably isn't a need.
```js
	var layers = neuralnet.layers
```

### alphabeta.clone
Use *.clone* if you want another NeuralNet based on the configuration and learning of an existing NeuralNet.  This allows you to take a snapshot of a NeuralNet after some training and explore what would happen if it received different training without modifying the original.

```js
var anotherNeuralNet = neuralnet.clone()
```

## Execution

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
var actualPredictionArray = neuralnet.train( inputArray , expectedOutputArray )
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

