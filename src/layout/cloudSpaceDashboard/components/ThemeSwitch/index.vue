<script lang="ts" setup>
import { type ThemeName, useTheme } from "../../hooks/useTheme"
import { MagicStick } from "@element-plus/icons-vue"

const { themeList, activeThemeName, setTheme } = useTheme()

const handleSetTheme = (name: ThemeName) => {
  setTheme(name)
}

import { ElDropdown, ElTooltip, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus';
</script>

<template>
  <ElDropdown trigger="click" @command="handleSetTheme">
    <div>
      <ElTooltip effect="dark" content="主题模式" placement="bottom">
        <ElIcon :size="20">
          <MagicStick />
        </ElIcon>
      </ElTooltip>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          :command="theme.name"
        >
          <span>{{ theme.title }}</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
