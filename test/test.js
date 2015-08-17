
module.exports = {

	'test basic construction' : function(beforeExit, assert) {

		var neuralnet = require("../neuralnet.js")({})

		var layers = [
			{ nodes : [] },
			{ connections : [[ 0.1 , 0.8 ],[ 0.4 , 0.6 ]] },
			{ connections : [[ 0.3 , 0.9 ]] }
		];

		neuralnet.layers = layers;
		
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round(100*layers[1].nodes[0]) , 68 );
		assert.equal( Math.round(10000*layers[1].nodes[1]) , 6637 );
		assert.equal( Math.round(100*layers[2].nodes[0]) , 69 );
		
		neuralnet.train( [0.35 , 0.9] , [0.5] );
		neuralnet.predict( [0.35 , 0.9] );
		assert.equal( Math.round( 100000 * ( 0.5 - layers[2].nodes[0] )) , -18203 );
	}

}
