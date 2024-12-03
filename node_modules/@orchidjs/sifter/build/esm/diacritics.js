/*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) */
// https://github.com/andrewrk/node-diacritics/blob/master/index.js
var latin_pat;
const accent_pat = '[\u0300-\u036F\u{b7}\u{2be}]'; // \u{2bc}

const accent_reg = new RegExp(accent_pat, 'g');
var diacritic_patterns;
const latin_convert = {
  'æ': 'ae',
  'ⱥ': 'a',
  'ø': 'o'
};
const convert_pat = new RegExp(Object.keys(latin_convert).join('|'), 'g');
/**
 * code points generated from toCodePoints();
 * removed 65339 to 65345
 */

const code_points = [[67, 67], [160, 160], [192, 438], [452, 652], [961, 961], [1019, 1019], [1083, 1083], [1281, 1289], [1984, 1984], [5095, 5095], [7429, 7441], [7545, 7549], [7680, 7935], [8580, 8580], [9398, 9449], [11360, 11391], [42792, 42793], [42802, 42851], [42873, 42897], [42912, 42922], [64256, 64260], [65313, 65338], [65345, 65370]];
/**
 * Remove accents
 * via https://github.com/krisk/Fuse/issues/133#issuecomment-318692703
 *
 */

const asciifold = str => {
  return str.normalize('NFKD').replace(accent_reg, '').toLowerCase().replace(convert_pat, function (foreignletter) {
    return latin_convert[foreignletter];
  });
};
/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 *
 */


const arrayToPattern = (chars, glue = '|') => {
  if (chars.length == 1) {
    return chars[0];
  }

  var longest = 1;
  chars.forEach(a => {
    longest = Math.max(longest, a.length);
  });

  if (longest == 1) {
    return '[' + chars.join('') + ']';
  }

  return '(?:' + chars.join(glue) + ')';
};
/**
 * Get all possible combinations of substrings that add up to the given string
 * https://stackoverflow.com/questions/30169587/find-all-the-combination-of-substrings-that-add-up-to-the-given-string
 *
 */

const allSubstrings = input => {
  if (input.length === 1) return [[input]];
  var result = [];
  allSubstrings(input.substring(1)).forEach(function (subresult) {
    var tmp = subresult.slice(0);
    tmp[0] = input.charAt(0) + tmp[0];
    result.push(tmp);
    tmp = subresult.slice(0);
    tmp.unshift(input.charAt(0));
    result.push(tmp);
  });
  return result;
};
/**
 * Generate a list of diacritics from the list of code points
 *
 */

const generateDiacritics = () => {
  var diacritics = {};
  code_points.forEach(code_range => {
    for (let i = code_range[0]; i <= code_range[1]; i++) {
      let diacritic = String.fromCharCode(i);
      let latin = asciifold(diacritic);

      if (latin == diacritic.toLowerCase()) {
        continue;
      }

      if (!(latin in diacritics)) {
        diacritics[latin] = [latin];
      }

      var patt = new RegExp(arrayToPattern(diacritics[latin]), 'iu');

      if (diacritic.match(patt)) {
        continue;
      }

      diacritics[latin].push(diacritic);
    }
  });
  var latin_chars = Object.keys(diacritics); // latin character pattern
  // match longer substrings first

  latin_chars = latin_chars.sort((a, b) => b.length - a.length);
  latin_pat = new RegExp('(' + arrayToPattern(latin_chars) + accent_pat + '*)', 'g'); // build diacritic patterns
  // ae needs: 
  //	(?:(?:ae|Æ|Ǽ|Ǣ)|(?:A|Ⓐ|Ａ...)(?:E|ɛ|Ⓔ...))

  var diacritic_patterns = {};
  latin_chars.sort((a, b) => a.length - b.length).forEach(latin => {
    var substrings = allSubstrings(latin);
    var pattern = substrings.map(sub_pat => {
      sub_pat = sub_pat.map(l => {
        if (diacritics.hasOwnProperty(l)) {
          return arrayToPattern(diacritics[l]);
        }

        return l;
      });
      return arrayToPattern(sub_pat, '');
    });
    diacritic_patterns[latin] = arrayToPattern(pattern);
  });
  return diacritic_patterns;
};
/**
 * Expand a regular expression pattern to include diacritics
 * 	eg /a/ becomes /aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑAⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ/
 *
 */

const diacriticRegexPoints = regex => {
  if (diacritic_patterns === undefined) {
    diacritic_patterns = generateDiacritics();
  }

  const decomposed = regex.normalize('NFKD').toLowerCase();
  return decomposed.split(latin_pat).map(part => {
    if (part == '') {
      return '';
    } // "ﬄ" or "ffl"


    const no_accent = asciifold(part);

    if (diacritic_patterns.hasOwnProperty(no_accent)) {
      return diacritic_patterns[no_accent];
    } // 'أهلا' (\u{623}\u{647}\u{644}\u{627}) or 'أهلا' (\u{627}\u{654}\u{647}\u{644}\u{627})


    const composed_part = part.normalize('NFC');

    if (composed_part != part) {
      return arrayToPattern([part, composed_part]);
    }

    return part;
  }).join('');
};

export { allSubstrings, arrayToPattern, asciifold, code_points, diacriticRegexPoints, generateDiacritics };
//# sourceMappingURL=diacritics.js.map
