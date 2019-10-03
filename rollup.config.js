import Path from 'path';
import Crypto from 'crypto';

import common from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import builtin from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';

import Package from './package.json';

const name = Package.name
	.replace(/^(?:@[^\/]+\/)?(.+)$/, '$1')
	.replace(/(?:^|-)(\w+)/g, (_, w) => w[0].toUpperCase() + w.slice(1));

function hash(...args) {
	return args
		.reduce(
			(hash, value) => hash.update(value),
			Crypto.createHash('sha256')
		)
		.digest('hex');
}

function plugins({ transpile, minify }) {
	return [
		common(),
		resolve(),
		builtin(),
		replace({
			...Package,
			signature: hash(name, Package.version),
			name,
			delimiters: ['%', '%']
		})
	]
		.concat(transpile ? buble() : [])
		.concat(minify ? terser() : []);
}

function dist(input, name, formats) {
	const transpile = Boolean(formats.filter((f) => f !== 'esm').length);
	const base = Path.basename(name, '.js').toLowerCase();

	return ['', '.min'].map((min) => ({
		input,
		plugins: plugins({ transpile, minify: Boolean(min) }),
		output: formats
			.map((format) => ({
				format,
				ext:
					format === 'esm'
						? `${min ? 'min.' : ''}mjs`
						: `${format}${min ? '.min' : ''}.js`
			}))
			.map(({ format, ext }) => ({
				name,
				format,
				file: `dist/${base}.${ext}`
			}))
	}));
}

export default []
	.concat(dist(Package.main, name, ['cjs', 'umd', 'iife']))
	.concat(dist(Package.main, name, ['esm']));
