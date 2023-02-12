import {View} from '@renderkit/server'

export { layout } from '../../layouts/layout'



export class Page extends View {
  templateName = 'button.html'

  getContextData() {
    return {}
  }
}

