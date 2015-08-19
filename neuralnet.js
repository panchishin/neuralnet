(function() {

var sigmoid = function( t ) {
	return 1 / ( 1 + Math.pow( Math.E , -t ) );
}

var updateOneNodeLayer = function( layer , previousLayer ) {
	layer.nodes = [];
	for( var n in layer.connections ) { 
		layer.nodes[n] = 0;
		for( var p in previousLayer.nodes ) {
			layer.nodes[n] += layer.connections[n][p] * previousLayer.nodes[p];
		}
		layer.nodes[n] = sigmoid(layer.nodes[n]);
	}
}

var updateNodeValues = function( layers ) {
	for( var i = 1 ; i < layers.length ; i++ ) {
		updateOneNodeLayer( layers[i] , layers[i-1] );
	}
};

var updateOneLayersError = function( layer , previousLayer ) {
	layer.error = [];
	for( var n in layer.nodes ) {
		if ( previousLayer.connections ) {
			layer.error[n] = 0;
			for( var c in previousLayer.error ) {
				layer.error[n] += previousLayer.error[c] * previousLayer.connections[c][n];
			}
		} else {
			layer.error[n] = previousLayer[n] - layer.nodes[n];
		}
		layer.error[n] = layer.error[n] * layer.nodes[n] * ( 1 - layer.nodes[n] );
	}
}

var updateConnectionWeights = function( layer , previousLayer , learningRate ) {
	learningRate = learningRate ? learningRate : 1;
	var errorLayer = previousLayer.error;
	var nodeLayer = layer.nodes;
	var connectionLayer = previousLayer.connections;

	for( var n in nodeLayer ) {
		for( var e in errorLayer ) {
			connectionLayer[e][n] = connectionLayer[e][n] + ( learningRate * errorLayer[e] * nodeLayer[n] );
		}
	}
}

var createRandomConnections = function( X , Y ) {
	var connections = [];
	for( var x = 0 ; x < X ; x++ ) {
		connections[x] = [];
		for( var y = 0 ; y < Y ; y++ ) {
			connections[x][y] = Math.random() * 2 - 1
		}
	}
	
	return connections;
}

var fail = function( message ) {
	throw message;
}

var predict = function( input , layers ) {
	(layers[1].connections[0].length >= input.length) || fail("The input is larger than the connections");
	layers[0].nodes = clone(input);
	while ( layers[1].connections[0].length > layers[0].nodes ) {
		layers[0].nodes.push(-1);
	}
	updateNodeValues(layers);
}

var train = function( input , layers , expectedOutput , learningRate ) {
	predict( input , layers );
	updateOneLayersError( layers[ layers.length - 1 ] , expectedOutput );
	updateConnectionWeights( layers[ layers.length - 2 ] , layers[ layers.length - 1 ] , learningRate);

	for( var i = layers.length - 3 ; i >= 0 ; i-- ) {
		updateOneLayersError( layers[ i + 1 ] , layers[ i + 2 ] );
		updateConnectionWeights( layers[ i ] , layers[ i + 1 ] , learningRate);
	}

}

function createLayers(config) {
	var layers = [];
	
	var nodes = [];
	for( var i = 0 ; i <= config.inputs ; i++ ) {
		nodes.push( -1 );
	}
	layers.push( { nodes : nodes } );
	
	layers.push( { connections : createRandomConnections( config.hiddenNodesPerLayer , config.inputs + 1 ) } );

	for( var h = 1 ; h < config.hiddenLayers ; h++ ) {
		layers.push( { connections : createRandomConnections( config.hiddenNodesPerLayer , config.hiddenNodesPerLayer ) } );
	}
	layers.push( { connections : createRandomConnections( config.outputs , config.hiddenNodesPerLayer ) } );
	return layers
}

var create = function( configuration ) { //inputs , hiddenLayers , hiddenNodesPerLayer , outputs ) {
	var config = configuration || {}
	config = clone(config)
	config.inputs = config.inputs || 2
	config.hiddenLayers = config.hiddenLayers || 1
	config.hiddenNodesPerLayer = config.hiddenNodesPerLayer || config.inputs * 5
	config.outputs = config.outputs || config.inputs
	config.learningRate = config.learningRate || 1

	if ( config.hiddenLayers <= 0 ) { fail("Must have at least 1 hidden layer") }
	
	return { 
		layers : createLayers(config),
		predict : function( input ) {
			predict( input , this.layers )
			return this.layers[this.layers.length - 1].nodes
		},
		predictBoolean : function( input ) {
			var result = this.predict( input )
			for( var index in result ) { result[index] = Math.round(result[index]) }
			return result
		},
		train : function( input , output , learningRate ) {
			train( input , this.layers , output , learningRate || config.learningRate );
			return this.layers[this.layers.length - 1].nodes
		},
		clone : function() {
			var item = create(config);
			item.layers = JSON.parse(JSON.stringify( this.layers ));
			return item;
		},
		new : function() {
			return create(config)
		}
	}		
}

var clone = function( data ) {
	return JSON.parse(JSON.stringify(data));
}

module.exports = create;

})()
