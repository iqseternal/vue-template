<script lang="ts" setup>
import { computed, inject } from "vue"
import { useRoute } from "vue-router"

import { DEFINE_DASHBOARD_PROVIDER } from '../external';

const route = useRoute()
const tagsViewStore = inject(DEFINE_DASHBOARD_PROVIDER.TAGS_VIEW) as any;
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews.value">
          <component :is="Component" :key="computed(() => route.path)" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--v3-body-bg-color);
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
