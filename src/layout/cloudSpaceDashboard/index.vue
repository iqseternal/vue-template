<script lang="ts" setup>
import { computed, provide, watch, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { DEFINE_DASHBOARD_PROVIDER, WIDTH } from "./external";
import { useRoute } from 'vue-router';
import { useAppStore, DeviceType, useSettingsStore, useTagsViewStore } from './store';

import { AppMain, NavigationBar, Settings, Sidebar, TagsView, RightPanel } from "./components";

import { useTheme } from './hooks/useTheme';
import { ElNotification, ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import './styles/index.scss';
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const tagesViewStore = useTagsViewStore();

provide(DEFINE_DASHBOARD_PROVIDER.APP_STORE, appStore);
provide(DEFINE_DASHBOARD_PROVIDER.SETTING_STORE, settingsStore);
provide(DEFINE_DASHBOARD_PROVIDER.TAGS_VIEW, tagesViewStore);

const { initTheme } = useTheme();
initTheme();
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCn;

/** 根据大小变化重新布局 */
const route = useRoute();
const _isMobile = () => document.body.getBoundingClientRect().width - 1 < WIDTH;

const _resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = _isMobile()
    appStore.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
    if (isMobile) appStore.closeSidebar(true);
  }
}

watch(
  () => route.name,
  () => {
    if (appStore.device.value === DeviceType.Mobile && appStore.sidebar.opened) {
      appStore.closeSidebar(false)
    }
  }
)

onBeforeMount(() => {
  window.addEventListener("resize", _resizeHandler)
})

onMounted(() => {
  if (_isMobile()) {
    appStore.toggleDevice(DeviceType.Mobile)
    appStore.closeSidebar(true)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", _resizeHandler)
})

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device.value === DeviceType.Mobile,
    showGreyMode: settingsStore.showGreyMode.value,
    showColorWeakness: settingsStore.showColorWeakness.value
  }
})

const handleClickOutside = () => appStore.closeSidebar(false);
</script>

<template>
  <ElConfigProvider :locale="locale">
    <div :class="classObj" class="app-wrapper">
      <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleClickOutside" />
      <Sidebar class="sidebar-container" />
      <div :class="{ hasTagsView: settingsStore.showTagsView }" class="main-container">
        <div :class="{ 'fixed-header': settingsStore.fixedHeader }">
          <NavigationBar v-if="settingsStore.fixedHeader.value" />
          <TagsView v-if="settingsStore.showTagsView.value" />
        </div>
        <AppMain />
        <RightPanel v-if="settingsStore.showSettings">
          <Settings />
        </RightPanel>
      </div>
    </div>
  </ElConfigProvider>
</template>

<style lang="scss" scoped>
@import "./styles/mixins.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}

.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: var(--v3-sidebar-width) !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
