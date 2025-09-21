# Simple signals

A simple signal implementation to show how they work.

## Examples

Basic usage:

```ts
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

## Tests

Tests can be run with the following command:

```bash
npm run test
```

## Contributing

Huh? Why?

## License

[MIT](https://choosealicense.com/licenses/mit/)
