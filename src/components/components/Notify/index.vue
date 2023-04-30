<script lang="ts" setup>
import { ref, computed } from "vue"
import { ElMessage } from "element-plus"
import { Bell } from "@element-plus/icons-vue"
import NotifyList from "./NotifyList.vue"
import { type IListItem, notifyData, messageData, todoData } from "./data"

type TabNameType = "通知" | "消息" | "待办"

interface IDataItem {
  name: TabNameType
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: IListItem[]
}

/** 角标当前值 */
const badgeValue = computed(() => {
  let value = 0
  for (let i = 0; i < data.value.length; i++) {
    value += data.value[i].list.length
  }
  return value
})
/** 角标最大值 */
const badgeMax = 99
/** 面板宽度 */
const popoverWidth = 350
/** 当前 Tab */
const activeName = ref<TabNameType>("通知")
/** 所有数据 */
const data = ref<IDataItem[]>([
  // 通知数据
  {
    name: "通知",
    type: "primary",
    list: notifyData
  },
  // 消息数据
  {
    name: "消息",
    type: "danger",
    list: messageData
  },
  // 待办数据
  {
    name: "待办",
    type: "warning",
    list: todoData
  }
])

const handleHistory = () => {
  ElMessage.success(`跳转到${activeName.value}历史页面`)
}

import { ElPopover, ElBadge, ElTooltip, ElIcon, ElTabs, ElTabPane, ElScrollbar, ElButton } from 'element-plus';
</script>

<template>
  <div class="notify">
    <ElPopover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <ElBadge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <ElTooltip effect="dark" content="消息通知" placement="bottom">
            <ElIcon :size="20">
              <Bell />
            </ElIcon>
          </ElTooltip>
        </ElBadge>
      </template>
      <template #default>
        <ElTabs v-model="activeName" class="demo-tabs" stretch>
          <ElTabPane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge :value="item.list.length" :max="badgeMax" :type="item.type" />
            </template>
            <ElScrollbar height="400px">
              <NotifyList :list="item.list" />
            </ElScrollbar>
          </ElTabPane>
        </ElTabs>
        <div class="notify-history">
          <ElButton link @click="handleHistory">查看{{ activeName }}历史</ElButton>
        </div>
      </template>
    </ElPopover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
