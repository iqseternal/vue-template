<script lang="ts" setup>
import { computed, inject } from "vue"
import { DEFINE_DASHBOARD_PROVIDER } from '../../external';
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import Breadcrumb from "../Breadcrumb/index.vue";
import Hamburger from "../Hamburger/index.vue";
import ThemeSwitch from "../ThemeSwitch/index.vue";
import Screenfull from "@components/Screenfull/index.vue";
import Notify from "@components/Notify/index.vue";

import { DASHBOARD_LOGIN_PATH } from '../../external';
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar } from 'element-plus';

const router = useRouter();
const appStore = inject(DEFINE_DASHBOARD_PROVIDER.APP_STORE) as any;
const settingsStore = inject(DEFINE_DASHBOARD_PROVIDER.SETTING_STORE) as any;
const tagsViewStore = inject(DEFINE_DASHBOARD_PROVIDER.TAGS_VIEW) as any;
const userStore = useUserStore();

const sidebar = appStore.sidebar;

const showNotify = computed(() => settingsStore.showNotify.value);
const showThemeSwitch = computed(() => settingsStore.showThemeSwitch.value);
const showScreenfull = computed(() => settingsStore.showScreenfull.value);

const toggleSidebar = () => { appStore.toggleSidebar(false); };

const logout = () => {
  userStore.logout()
  tagsViewStore.delAllCachedViews();
  tagsViewStore.delAllVisitedViews();
  router.push(DASHBOARD_LOGIN_PATH);
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <ElDropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <ElAvatar :icon="UserFilled" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem divided @click="logout">
              <span style="display: block">退出登录</span>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
