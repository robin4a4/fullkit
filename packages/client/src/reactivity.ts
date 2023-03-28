export type UseSignal<TSignalValue> = [
  () => TSignalValue,
  (newValue: TSignalValue) => void
];
export type Signal<TSignalValue> = {
  get value(): TSignalValue;
  set value(newValue: TSignalValue);
};
type TExecuteEffect = () => void;
type TObserver = { execute: TExecuteEffect };

const globalContext: Array<TObserver> = [];

export const signal = function <TSignalValue>(
  val: TSignalValue
): Signal<TSignalValue> {
  const subscriptions = new Set<TObserver>();
  return {
    get value() {
      const observer = globalContext[globalContext.length - 1];
      if (observer) subscriptions.add(observer);
      return val;
    },
    set value(newValue) {
      val = newValue;
      for (const sub of [...subscriptions]) {
        sub.execute();
      }
    },
  };
};

export const useSignal = function <TSignalValue>(
  value: TSignalValue
): UseSignal<TSignalValue> {
  const subscriptions = new Set<TObserver>();

  const read = (): TSignalValue => {
    const observer = globalContext[globalContext.length - 1];
    if (observer) subscriptions.add(observer);
    return value;
  };
  const write = (newValue: TSignalValue) => {
    value = newValue;
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  };
  return [read, write];
};

export const effect = function (func: any) {
  const execute: TExecuteEffect = () => {
    globalContext.push(observer);
    try {
      func();
    } finally {
      globalContext.pop();
    }
  };

  const observer: TObserver = {
    execute,
  };

  execute();
};
