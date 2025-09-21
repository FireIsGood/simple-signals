# Simple signals

A simple signal implementation to demonstrate how they work.

This project is based off the implementation as demonstrated by [Joy Of Code on
YouTube](https://www.youtube.com/watch?v=M5oAYP6Rxkg) with modifications to match modern implementations&mdash;mostly
to allow for direct calling to get the value.

Source code for reference can be found at [src/simple-signals.ts](src/simple-signals.ts) to show how simple the pattern
is.

## Examples

Basic usage:

```ts
import { computed, signal, Signal } from "@fireisgood/simple-signals";

const count = signal(1);
console.log(count()); // 1

// doubled.set() causes type errors
const doubled = computed(() => count() * 2);
console.log(count(), doubled()); // 1 2

count.set(4);
console.log(count(), doubled()); // 2 4

count.update((val) => val + 1);
console.log(count(), doubled()); // 5 10

// reference.set() causes type errors
const reference: Signal<number> = count;
console.log(count(), doubled(), reference()); // 5 10 5

count.set(10);
console.log(count(), doubled(), reference()); // 10 20 10
```

## Installation

The source code is offered as an NPM package:

```bash
npm install @fireisgood/simple-signals
```

## Tests

Tests are run using Jest and can be run with the following command:

```bash
npm run test
```

## Contributing

Huh? Why?

## License

[MIT](https://choosealicense.com/licenses/mit/)
