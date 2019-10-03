# Reference

Working with guaranteed unique but reusable (singletons) can be somehwat of a hassle, as there's always the risk of accidentally creating a memory leak and the logic to keep track of references using [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is highly repetative (as in, the same for most references).

# Installation

```
$ npm install --save @konfirm/reference
```

# Usage

In itself Reference doesn't do anything other than providing the static factory method `for`, so it has to be extended in order to provide meaningful purpose.

```js
const Reference = require('@konfirm/reference');

class Proof extends Reference {
	constructor(name) {
		super();

		this.name = name;
		this.date = new Date();
	}
}

const target = {};
const proof = Proof.for(target, 'Exhibit A');
```

## API

The API of the Reference class consists of just the `for` method, which provides an instance of the Reference (extend). If an instance does not exist (yet or anymore) it will be created.

All references are stored using [WeakMaps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) and because of that unused references are removed from memory.

### `Reference.for(<object> target [, ...arguments])`

Obtains a Reference (extend) instance for the provided target object, if no instance exists it will be created.

## License

MIT License Copyright (c) 2019 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
