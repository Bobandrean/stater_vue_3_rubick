import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';
import path from 'path';
import fs from 'fs';

var configs = [];
const banner = `/*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) */`;

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

var babel_config = babel({
	extensions: extensions,
	babelHelpers: 'bundled',
	configFile: path.resolve(__dirname,'babel.config.json'),
});

var terser_config = terser({
  mangle: true,
  format: {
    semicolons: false,
    comments: function (node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type == "comment2") {
        // multiline comment
        return /\* sifter.js/i.test(text);
      }
    },
  },
});


// esm
configs.push({
	input: path.resolve(__dirname,'../lib/sifter.ts'),
	output:{
		dir: path.resolve(__dirname,'../build/esm'),
		format: 'esm',
		preserveModules: true,
		sourcemap: true,
		banner: banner,
	},
	plugins:[babel_config] // resolve_config
});

// cjs
configs.push({
	input: path.resolve(__dirname,'../lib/sifter.ts'),
	output:{
		dir: path.resolve(__dirname,'../build/cjs'),
		format: 'cjs',
		preserveModules: true,
		sourcemap: true,
		banner: banner,
	},
	plugins:[babel_config] //resolve_config
});


// umd
configs.push({
		input: path.resolve(__dirname,'../lib/sifter.ts'),
		output: {
			name: 'sifter',
			file: `build/umd/sifter.js`,
			format: 'umd',
			sourcemap: true,
			banner: banner
		},
		plugins:[
			babel_config,
		]
	});

// umd min
configs.push({
		input: path.resolve(__dirname,'../lib/sifter.ts'),
		output: {
			name: 'sifter',
			file: `build/umd/sifter.min.js`,
			format: 'umd',
			sourcemap: true,
			banner: banner
		},
		plugins:[
			babel_config,
			terser_config
		]
	});


export default configs;
