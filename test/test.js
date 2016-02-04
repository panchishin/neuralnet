
function filterTraining( output , expected ) {
	var equalEnough = true
	for( var i = 0 ; i < expected.length && equalEnough ; i++ ) {
		equalEnough = ( Math.round( expected[i] ) == Math.round( output[i] ) )
	}
	// only train if the output and expected are not equal enough
	return ! equalEnough
}

function makeLayers() {
	return [
		{ nodes : [] },
		{ connections : [[ 0.1 , 0.8 ],[ 0.4 , 0.6 ]] },
		{ connections : [[ 0.3 , 0.9 ]] }
	];
}

module.exports = {

	'test basic construction' : function(beforeExit, assert) {

		var neuralnet = require("../neuralnet.js")({})

		var layers = makeLayers();

		neuralnet.layers = layers;
		
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round(100*layers[1].nodes[0]) , 68 );
		assert.equal( Math.round(10000*layers[1].nodes[1]) , 6637 );
		assert.equal( Math.round(100*layers[2].nodes[0]) , 69 );
		assert.equal( Math.round( 100000 * ( 0.5 - layers[2].nodes[0] )) , -19028 );
		
		neuralnet.train( [0.35 , 0.9] , [0.5] );
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - layers[2].nodes[0] )) , -18203 );
	},

	'test copy' : function(beforeExit, assert) {

		var data = makeLayers();

		var neuralnet = require("../neuralnet.js")({ layers : data  })

		assert.equal( neuralnet.layers[1].connections[0][1] , 0.8 )
		neuralnet = neuralnet.clone();
		assert.equal( neuralnet.layers[1].connections[0][1] , 0.8 )
		var layers = neuralnet.layers;

		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round(100*layers[1].nodes[0]) , 68 );
		assert.equal( Math.round(10000*layers[1].nodes[1]) , 6637 );
		assert.equal( Math.round(100*layers[2].nodes[0]) , 69 );
		assert.equal( Math.round( 100000 * ( 0.5 - layers[2].nodes[0] )) , -19028 );
		
		neuralnet.train( [0.35 , 0.9] , [0.5] );
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - layers[2].nodes[0] )) , -18203 );

	},

	'test reset' : function(beforeExit, assert) {
		var data = makeLayers();

		var neuralnet = require("../neuralnet.js")({ inputs : 2 , outputs : 1  })
		neuralnet.predict( [0.35 , 0.9] );
		for( var count = 0 ; count < 1000 && Math.round( 1000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) != 0 ; count ++) {
			neuralnet.train( [0.35 , 0.9] , [0.5] );
			neuralnet.predict( [0.35 , 0.9] );
		}
		assert.equal( Math.round( 1000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) , 0 );

		var equal = true;
		for( var count = 0 ; count < 10 && equal ; count++) {
			neuralnet.reset();
			neuralnet.predict( [0.35 , 0.9] );
			equal = ( Math.round( 1000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) == 0 );
		}
		assert.equal(equal,false,"The reset should change the neuralnet")
	},

	'test stringify of config' : function(beforeExit, assert) {
		var data = makeLayers();

		var temp = require("../neuralnet.js")({ learningRate : 2 })
		var neuralnet =  require("../neuralnet.js")( JSON.parse( JSON.stringify ( temp.config() ) ) )
		neuralnet.layers = data;

		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) , -19028 );
		
		neuralnet.train( [0.35 , 0.9] , [0.5] );
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) , -17371 );

	},

	'test stringify with filterTraining function' : function(beforeExit, assert) {
		var data = makeLayers();

		var temp = require("../neuralnet.js")({ layers : data , filterTraining : filterTraining })
		var neuralnet =  require("../neuralnet.js")( JSON.parse( JSON.stringify ( temp.config() ) ) )
		neuralnet.layers = data;

		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) , -19028 );
		
		neuralnet.train( [0.35 , 0.9] , [0.5] );
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - neuralnet.layers[2].nodes[0] )) , -19028 );

	}


}
