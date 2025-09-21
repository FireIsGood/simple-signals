/**
 * Implementation details behind how a signal sets subscribers.
 */
let activeEffect: (() => void) | null = null;

/**
 * A reactive value.
 *
 * To unwrap the current value, call the signal as a function.
 *
 * The type Signal cannot be updated directly as compared to WritableSignal.
 */
export type Signal<T> = () => T;

/**
 * A signal that can be written to with a set or update function.
 * To unwrap the current value, call the signal as a function.
 */
export interface WritableSignal<T> extends Signal<T> {
  set(value: T): void;
  update(updateFn: (value: T) => T): void;
}

/**
 * Creates a WritableSignal<T>
 */
export function signal<T>(value: T): WritableSignal<T> {
  let _value: T = value;
  let _subscribers: Set<() => void> = new Set([]);

  function _signal(): T {
    if (activeEffect) {
      _subscribers.add(activeEffect);
    }
    return _value;
  }

  _signal.set = function (value: T) {
    _value = value;
    _subscribers.forEach((effect) => effect());
  };

  _signal.update = function (updateFn: (value: T) => T) {
    _value = updateFn(_value);
    _subscribers.forEach((effect) => effect());
  };

  return _signal;
}

/**
 * Creates an effect to be run whenever any dependant signals are set.
 */
export function effect(fn: () => void): void {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

/**
 * Creates a Signal derived from an expression
 */
export function computed<T>(fn: () => T): Signal<T> {
  let value = signal(fn());
  effect(() => {
    value.set(fn());
  });
  return value;
}
