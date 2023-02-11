import { newSignal, run } from "@renderkit/client";

run(() => {
  const [isOpen, setIsOpen] = newSignal(false);
  return { isOpen, setIsOpen };
});
