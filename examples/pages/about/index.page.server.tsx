import {Includer} from "compile-include-html"


function createPage(template: string, context: {}) {
  return {
    template, context
  }
}


export function Page() {
  return createPage('button.html', {})
}