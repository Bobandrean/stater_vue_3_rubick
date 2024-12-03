var assert = require('assert');
var diacritics = require('../build/cjs/diacritics.js');
var utils = require('../build/cjs/utils.js');
var Sifter = require('../build/cjs/sifter.js');

describe('diacritics', () => {

	it('Should match composed and decomposed strings', () => {
		
		const sifter		= new Sifter([]);
		const composed		= 'أهلا'; // '\u{623}\u{647}\u{644}\u{627}'
		const decomposed	= 'أهلا'; // '\u{627}\u{654}\u{647}\u{644}\u{627}'
			
		assert.notEqual(composed,decomposed);


		tokens = sifter.tokenize(composed);
		assert.equal(tokens[0].regex.test(composed), true);
		
		tokens = sifter.tokenize(decomposed);
		assert.equal(tokens[0].regex.test(decomposed), true);
		
		tokens = sifter.tokenize(composed);
		assert.equal(tokens[0].regex.test(decomposed), true);

		tokens = sifter.tokenize(decomposed);
		assert.equal(tokens[0].regex.test(composed), true);
		
	});

	
	it('Should match all diacritic code points',()=>{

		const sifter		= new Sifter([]);
		
		diacritics.code_points.forEach((code_range)=>{
			for(let i = code_range[0]; i <= code_range[1]; i++){
				
				let composed	= String.fromCharCode(i);
				let decomposed	= composed.normalize('NFKD');
				
				if( composed.trim().length == 0 ){
					continue;
				}
								
				tokens = sifter.tokenize(composed);
				assert.equal(tokens[0].regex.test(composed), true, 'composed should match composed for ' + composed + ' regex: '+tokens[0].regex);
				
				tokens = sifter.tokenize(decomposed);
				assert.equal(tokens[0].regex.test(decomposed), true, 'decomposed should match composed for ' + decomposed + ' and ' + composed + ' regex: '+tokens[0].regex);
				
				tokens = sifter.tokenize(composed);
				assert.equal(tokens[0].regex.test(decomposed), true, 'composed should match decomposed for ' + composed + ' and ' + decomposed + ' regex: '+tokens[0].regex);

				tokens = sifter.tokenize(decomposed);
				assert.equal(tokens[0].regex.test(composed), true, 'decomposed should match composed for ' + decomposed + ' and ' + composed + ' regex: '+tokens[0].regex);
					
			};
		});

	});
	
	
});
