import { type App } from "vue"
import { permission } from "./permission"

export default {
  install(app: App): void {

    app.directive("permission", permission);
  }
}
