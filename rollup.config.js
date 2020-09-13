// rollup.config.js

import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
	input: './snake-ts/build/main.js',
	output: {
		file: './server/public/bundle.js',
		format: 'iife'
	},
	plugins: [
		typescript({

		}),
		sourcemaps(),
	],
};