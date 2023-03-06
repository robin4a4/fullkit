export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplementedError";
  }
}

export class View {
  templateName: string;

  getContextData(): Record<string, any> {
    throw new NotImplementedError();
  }

  get() {
    return {
      template: this.templateName,
      context: this.getContextData(),
    };
  }

  post(requestBody: Record<string, any>) {
    return requestBody;
  }
}
