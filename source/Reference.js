//  ensure globalThis
require('@ungap/global-this');

const unique = `%name%-%version%-%signature%`;
const storage = (globalThis[unique] = globalThis[unique] || new WeakMap());

//  using the singleton storage variable as reference to itself provides
//  the ability to absolutely register the Reference class only once,
//  regardless of loading mechanisms
if (!storage.has(storage)) {
	storage.set(
		storage,
		/**
		 * Create references linked to objects
		 *
		 * @class Reference
		 */
		class Reference {
			/**
			 * Factory returning pre-existing instances (singleton)
			 *
			 * @static
			 * @param {object} target
			 * @returns {Reference} instance
			 * @memberof Reference
			 */
			static for(target, ...args) {
				if (!storage.has(this)) {
					storage.set(this, new WeakMap());
				}

				const reference = storage.get(this);

				if (!reference.has(target)) {
					reference.set(target, new this(...args));
				}

				return reference.get(target);
			}
		}
	);
}

//  export the singleton Reference class
module.exports = storage.get(storage);
