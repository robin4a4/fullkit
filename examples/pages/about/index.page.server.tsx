export { layout } from '../../layouts/layout'


function createPage(template: string, context: {}) {
  return {
    template, context
  }
}


export function Page() {
  return createPage('button.html', {})
}