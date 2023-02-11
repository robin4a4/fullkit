export type TSignal<TSignalValue> = [
  () => TSignalValue,
  (newValue: TSignalValue) => void
];
type TExecuteEffect = () => void;
type TObserver = { execute: TExecuteEffect };

const globalContext: Array<TObserver> = [];

export const newSignal = function <TSignalValue>(
  value: TSignalValue
): TSignal<TSignalValue> {
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

export const newEffect = function (func: any) {
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
