
type TDiacraticList = {[key:string]:string};

// https://github.com/andrewrk/node-diacritics/blob/master/index.js

var latin_pat:RegExp;
const accent_pat = '[\u0300-\u036F\u{b7}\u{2be}]'; // \u{2bc}
const accent_reg = new RegExp(accent_pat,'g');
var diacritic_patterns:TDiacraticList;

const latin_convert:TDiacraticList = {
	'æ': 'ae',
	'ⱥ': 'a',
	'ø': 'o',
};

const convert_pat = new RegExp(Object.keys(latin_convert).join('|'),'g');


export const DIACRITICS:TDiacraticList = {
	" ":" ",
	0:"߀",
	A:"ⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ",
	AA:"Ꜳ",
	AE:"ÆǼǢ",
	AO:"Ꜵ",
	AU:"Ꜷ",
	AV:"ꜸꜺ",
	AY:"Ꜽ",
	B:"ⒷＢḂḄḆɃƁ",
	C:"ⒸＣꜾḈĆCĈĊČÇƇȻ",
	D:"ⒹＤḊĎḌḐḒḎĐƊƉᴅꝹ",
	Dh:"Ð",
	DZ:"ǱǄ",
	Dz:"ǲǅ",
	E:"ɛⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎᴇ",
	F:"ꝼⒻＦḞƑꝻ",
	G:"ⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾɢ",
	H:"ⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ",
	I:"ⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ",
	J:"ⒿＪĴɈȷ",
	K:"ⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ",
	L:"ⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ",
	LJ:"Ǉ",
	Lj:"ǈ",
	M:"ⓂＭḾṀṂⱮƜϻ",
	N:"ꞤȠⓃＮǸŃÑṄŇṆŅṊṈƝꞐᴎ",
	NJ:"Ǌ",
	Nj:"ǋ",
	O:"ⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ",
	OE:"Œ",
	OI:"Ƣ",
	OO:"Ꝏ",
	OU:"Ȣ",
	P:"ⓅＰṔṖƤⱣꝐꝒꝔ",
	Q:"ⓆＱꝖꝘɊ",
	R:"ⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ",
	S:"ⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ",
	T:"ⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ",
	Th:"Þ",
	TZ:"Ꜩ",
	U:"ⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ",
	V:"ⓋＶṼṾƲꝞɅ",
	VY:"Ꝡ",
	W:"ⓌＷẀẂŴẆẄẈⱲ",
	X:"ⓍＸẊẌ",
	Y:"ⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ",
	Z:"ⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ",
	a:"ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑ",
	aa:"ꜳ",
	ae:"æǽǣ",
	ao:"ꜵ",
	au:"ꜷ",
	av:"ꜹꜻ",
	ay:"ꜽ",
	b:"ⓑｂḃḅḇƀƃɓƂ",
	c:"ｃⓒćĉċčçḉƈȼꜿↄ",
	d:"ⓓｄḋďḍḑḓḏđƌɖɗƋᏧԁꞪ",
	dh:"ð",
	dz:"ǳǆ",
	e:"ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇǝ",
	f:"ⓕｆḟƒ",
	ff:"ﬀ",
	fi:"ﬁ",
	fl:"ﬂ",
	ffi:"ﬃ",
	ffl:"ﬄ",
	g:"ⓖｇǵĝḡğġǧģǥɠꞡꝿᵹ",
	h:"ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ",
	hv:"ƕ",
	i:"ⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı",
	j:"ⓙｊĵǰɉ",
	k:"ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ",
	l:"ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇɭ",
	lj:"ǉ",
	m:"ⓜｍḿṁṃɱɯ",
	n:"ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥлԉ",
	nj:"ǌ",
	o:"ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿꝋꝍɵɔᴑ",
	oe:"œ",
	oi:"ƣ",
	oo:"ꝏ",
	ou:"ȣ",
	p:"ⓟｐṕṗƥᵽꝑꝓꝕρ",
	q:"ⓠｑɋꝗꝙ",
	r:"ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ",
	s:"ⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛʂ",
	ss:"ß",
	t:"ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ",
	th:"þ",
	tz:"ꜩ",
	u:"ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ",
	v:"ⓥｖṽṿʋꝟʌ",
	vy:"ꝡ",
	w:"ⓦｗẁẃŵẇẅẘẉⱳ",
	x:"ⓧｘẋẍ",
	y:"ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ",
	z:"ⓩｚźẑżžẓẕƶȥɀⱬꝣ"
}

/**
 * code points generated from toCodePoints();
 * removed 65339 to 65345
 */
export const code_points = [
	[ 67, 67 ],
	[ 160, 160 ],
	[ 192, 438 ],
	[ 452, 652 ],
	[ 961, 961 ],
	[ 1019, 1019 ],
	[ 1083, 1083 ],
	[ 1281, 1289 ],
	[ 1984, 1984 ],
	[ 5095, 5095 ],
	[ 7429, 7441 ],
	[ 7545, 7549 ],
	[ 7680, 7935 ],
	[ 8580, 8580 ],
	[ 9398, 9449 ],
	[ 11360, 11391 ],
	[ 42792, 42793 ],
	[ 42802, 42851 ],
	[ 42873, 42897 ],
	[ 42912, 42922 ],
	[ 64256, 64260 ],
	[ 65313, 65338 ],
	[ 65345, 65370 ]
];

/**
 * Remove accents
 * via https://github.com/krisk/Fuse/issues/133#issuecomment-318692703
 *
 */
export const asciifold = (str:string):string => {
	return str
		.normalize('NFKD')
		.replace(accent_reg, '')
		.toLowerCase()
		.replace(convert_pat,function(foreignletter) {
			return latin_convert[foreignletter];
		});
};


/**
 * Convert list of diacritics to array of code points
 *
 */
// @ts-ignore
function toCodePoints(tolerance=8){
	var char_codes:number[] = [];

	for( let letter in DIACRITICS ){
		let _diacritics = DIACRITICS[letter];
		for( let n = 0; n < _diacritics.length; n++ ){
			var code_point = _diacritics.codePointAt(n);
			if( code_point ) char_codes.push( code_point );
		}
	}

	//https://stackoverflow.com/questions/40431572/is-there-a-simple-way-to-group-js-array-values-by-range
	char_codes.sort((a, b) => a - b);
	var accumulator: number[][] = [];
	char_codes.reduce(function (accumulator, currentValue, index, source) {

		if( !index ){
			accumulator.push( [currentValue,currentValue] );

		}else if( currentValue - source[index - 1] > tolerance ){
			accumulator.push( [currentValue,currentValue] );

		}else{

			let range = accumulator.pop();
			if( range ){
				accumulator.push( [range[0],currentValue]);
			}
		}

		return accumulator;
	}, accumulator);

}

/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 *
 */
export const arrayToPattern = (chars:string[],glue:string='|'):string =>{
	
	if( chars.length == 1 ){
		return chars[0];
	}
	
	var longest = 1;
	chars.forEach((a)=>{longest = Math.max(longest,a.length)});

	if( longest == 1 ){
		return '['+chars.join('')+']';
	}

	return '(?:'+chars.join(glue)+')';	
};

/**
 * Get all possible combinations of substrings that add up to the given string
 * https://stackoverflow.com/questions/30169587/find-all-the-combination-of-substrings-that-add-up-to-the-given-string
 *
 */
export const allSubstrings = (input:string):string[][] => {

    if( input.length === 1) return [[input]];

    var result:string[][] = [];
    allSubstrings(input.substring(1)).forEach(function(subresult) {
        var tmp = subresult.slice(0);
        tmp[0] = input.charAt(0) + tmp[0];
        result.push(tmp);

        tmp = subresult.slice(0);
        tmp.unshift(input.charAt(0));
        result.push(tmp);
    });
    
    return result;
}

/**
 * Generate a list of diacritics from the list of code points
 *
 */
export const generateDiacritics = ():TDiacraticList => {	

	var diacritics:{[key:string]:string[]} = {};
	code_points.forEach((code_range)=>{

		for(let i = code_range[0]; i <= code_range[1]; i++){
			
			let diacritic	= String.fromCharCode(i);
			let	latin		= asciifold(diacritic);

			if( latin == diacritic.toLowerCase() ){
				continue;
			}

			if( !(latin in diacritics) ){
				diacritics[latin] = [latin];
			}
			
			var patt = new RegExp( arrayToPattern(diacritics[latin]),'iu');
			if( diacritic.match(patt) ){
				continue;
			}
			
			diacritics[latin].push(diacritic);
		}
	});
		
	var latin_chars = Object.keys(diacritics);
	
	
	// latin character pattern
	// match longer substrings first
	latin_chars		= latin_chars.sort((a, b) => b.length - a.length );
	latin_pat		= new RegExp('('+ arrayToPattern(latin_chars) + accent_pat + '*)','g');
	
	
	// build diacritic patterns
	// ae needs: 
	//	(?:(?:ae|Æ|Ǽ|Ǣ)|(?:A|Ⓐ|Ａ...)(?:E|ɛ|Ⓔ...))
	var diacritic_patterns:TDiacraticList = {};
	latin_chars.sort((a,b) => a.length -b.length).forEach((latin)=>{
		
		var substrings	= allSubstrings(latin);
		var pattern = substrings.map((sub_pat)=>{
			
			sub_pat = sub_pat.map((l)=>{
				if( diacritics.hasOwnProperty(l) ){
					return arrayToPattern(diacritics[l]);
				}
				return l;
			});
			
			return arrayToPattern(sub_pat,'');
		});
		
		diacritic_patterns[latin] = arrayToPattern(pattern);		
	});
			
	return diacritic_patterns;
}

/**
 * Expand a regular expression pattern to include diacritics
 * 	eg /a/ becomes /aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑAⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ/
 *
 */
export const diacriticRegexPoints = (regex:string):string => {

	if( diacritic_patterns === undefined ){
		diacritic_patterns = generateDiacritics();
	}
	
	const decomposed		= regex.normalize('NFKD').toLowerCase();
	
	return decomposed.split(latin_pat).map((part:string)=>{
		
		if( part == '' ){
			return '';
		}
		
		// "ﬄ" or "ffl"
		const no_accent = asciifold(part);				
		if( diacritic_patterns.hasOwnProperty(no_accent) ){
			return diacritic_patterns[no_accent];
		}
		
		// 'أهلا' (\u{623}\u{647}\u{644}\u{627}) or 'أهلا' (\u{627}\u{654}\u{647}\u{644}\u{627})
		const composed_part = part.normalize('NFC');
		if( composed_part != part ){
			return arrayToPattern([part,composed_part]);
		}
				
		return part;
	}).join('');
	
}
