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

var create = function( request ) { //inputs , hiddenLayers , hiddenNodesPerLayer , outputs ) {
	request = request || {}
	var inputs = request.inputs
	var hiddenLayers = request.hiddenLayers || 1
	var hiddenNodesPerLayer = request.hiddenNodesPerLayer || inputs * 5
	var outputs = request.outputs || inputs
	var learningRate = request.learningRate || 1

	if ( hiddenLayers <= 0 ) { fail("Must have at least 1 hidden layer") }
	
	var layers = [];
	
	var nodes = [];
	for( var i = 0 ; i <= inputs ; i++ ) {
		nodes.push( -1 );
	}
	layers.push( { nodes : nodes } );
	
	layers.push( { connections : createRandomConnections( hiddenNodesPerLayer , inputs + 1 ) } );

	for( var h = 1 ; h < hiddenLayers ; h++ ) {
		layers.push( { connections : createRandomConnections( hiddenNodesPerLayer , hiddenNodesPerLayer ) } );
	}
	layers.push( { connections : createRandomConnections( outputs , hiddenNodesPerLayer ) } );

	return { 
		layers : layers,
		learningRate : learningRate,
		predict : function( input ) {
			predict( input , this.layers );
		},
		train : function( input , output , learningRate ) {
			train( input , this.layers , output , learningRate || this.learningRate );
		},
		clone : function() {
			var item = create( { inputs : 1 } );
			item.layers = JSON.parse(JSON.stringify( this.layers ));
			item.learningRate = this.learningRate;
			return item;
		}
	}

		
}

var clone = function( data ) {
	return JSON.parse(JSON.stringify(data));
}

module.exports = create;

})()
