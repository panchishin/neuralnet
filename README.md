# neuralnet - an Artificial Neural Net


[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Auto Test Status][travis-image]][travis-url] [![Gitter chat][gitter-image]][gitter-url] 

neuralnet implementation classic Artificial Neural Net with back propogation for learning.

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

### neuralnet.layers

You can inspect and modify the data in the layers by accessing the layers, although there probably isn't a need.
```js
	var layers = neuralnet.layers
```

### alphabeta.clone
Use *.clone* you want another NeuralNet based on the configuration and learning of another NeuralNet.  This allows you to take a snapshot of a NeuralNet after some training and explore what would happen if it received different training without modifying the original.

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
neuralnet.train( inputArray , expectedOutputArray )
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

