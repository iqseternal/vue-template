<script lang="ts" setup>
import { inject } from 'vue';
import { DEFINE_DASHBOARD_PROVIDER } from '../../external';
import { ElSwitch } from 'element-plus';

const settingsStore = inject(DEFINE_DASHBOARD_PROVIDER.SETTING_STORE) as any;
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局配置</h3>
      <div class="drawer-item">
        <span>显示标签栏</span>
        <ElSwitch v-model="settingsStore.showTagsView.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示侧边栏 Logo</span>
        <ElSwitch v-model="settingsStore.showSidebarLogo.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>固定 Header</span>
        <ElSwitch v-model="settingsStore.fixedHeader.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示消息通知</span>
        <ElSwitch v-model="settingsStore.showNotify.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示切换主题按钮</span>
        <ElSwitch v-model="settingsStore.showThemeSwitch.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示全屏按钮</span>
        <ElSwitch v-model="settingsStore.showScreenfull.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示灰色模式</span>
        <ElSwitch v-model="settingsStore.showGreyMode.value" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示色弱模式</span>
        <ElSwitch v-model="settingsStore.showColorWeakness.value" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
  }
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
