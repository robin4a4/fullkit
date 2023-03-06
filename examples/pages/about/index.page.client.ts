import { newSignal, run } from "@renderkit/client";

// run(() => {
//   const [isOpen, setIsOpen] = newSignal(false);
//   return { isOpen, setIsOpen };
// });

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData(form);
  fetch("./about", { method: "POST", body: formData });
});
