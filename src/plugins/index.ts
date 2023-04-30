import { type App } from "vue"

import { loadSvg } from './icons';

export default {
  install(app: App): void {
    loadSvg(app);
  }
}
