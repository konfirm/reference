/* global source, describe, it, each, expect */

const Reference = source('Reference');

function requireUncached(module) {
	delete require.cache[require.resolve(module)];
	return require(module);
}

class Proof extends Reference {
	constructor(...args) {
		super();

		this.args = args;
	}
}

describe('Reference', () => {
	const common = new Object();

	it('allows new instances', (next) => {
		const one = new Reference();
		const two = new Reference();

		expect(one).not.to.shallow.equal(two);

		next();
	});

	it('creates singletons', (next) => {
		const Alternative = requireUncached('../../source/Reference.js');

		const one = Reference.for(common);
		const two = Reference.for(common);
		const alt = Alternative.for(common);

		expect(one).to.shallow.equal(two);
		expect(one).to.shallow.equal(alt);
		expect(two).to.shallow.equal(alt);

		next();
	});

	describe('Proof', () => {
		it('allows new instances', (next) => {
			const one = new Proof('foo', 'bar');
			const two = new Proof('bar', 'baz');

			expect(one).not.to.shallow.equal(two);
			expect(one.args).not.to.shallow.equal(two.args);

			expect(one.args[0]).to.equal('foo');
			expect(one.args[1]).to.equal('bar');

			expect(two.args[0]).to.equal('bar');
			expect(two.args[1]).to.equal('baz');

			next();
		});

		it('creates singletons', (next) => {
			const one = Proof.for(common, 'foo', 'bar');
			const two = Proof.for(common, 'bar', 'baz');

			expect(one).to.shallow.equal(two);
			expect(one.args).to.shallow.equal(two.args);

			expect(one.args[0]).to.equal('foo');
			expect(one.args[1]).to.equal('bar');

			expect(two.args[0]).to.equal('foo');
			expect(two.args[1]).to.equal('bar');

			next();
		});
	});
});
