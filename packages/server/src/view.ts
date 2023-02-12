export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplementedError";
  }
}

export class View {
  templateName: string;

  getContextData() {
    throw new NotImplementedError();
  }

  get() {
    return {
      template: this.templateName,
      context: this.getContextData(),
    };
  }
}
