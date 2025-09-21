import { computed, effect, signal } from "./simple-signals";

describe("WritableSignal", () => {
  it("should be able to return its value", () => {
    const count = signal(0);
    expect(count()).toBe(0);
  });

  it("should be able to be set", () => {
    const count = signal(0);
    count.set(1);
    expect(count()).toBe(1);
  });
});

test("effects rerun on signal change", () => {
  const callback = jest.fn();

  const count = signal(0);
  let other = 0;

  effect(() => {
    other = count();
    callback();
  });

  expect(other).toBe(0);
  expect(callback).toHaveBeenCalledTimes(1);

  count.set(1);

  expect(other).toBe(1);
  expect(callback).toHaveBeenCalledTimes(2);
});

test("computed reacts on signal change", () => {
  const count = signal(0);
  const doubled = computed(() => count() * 2);

  expect(doubled()).toBe(0);

  count.set(1);

  expect(doubled()).toBe(2);
});
