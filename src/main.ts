import { createApp } from 'vue';

import router from './router';
import store from './store';

import plugins from '@/plugins';
import directives from '@/directives';

import App from './App.vue';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';;
import './style.scss';

;(async () => {
  const app = createApp(App);

  app.mixin({
    methods: {
      a() {
        return 1;
      }
    }
  });

  app.use(store);

  app.use(router);

  app.use(plugins);

  app.use(directives);

  router.isReady().then(() => {
    app.mount('#app')
  });
})();
