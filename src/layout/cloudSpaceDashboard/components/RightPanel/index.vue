<script lang="ts" setup>
import { ref } from "vue"
import { Setting } from "@element-plus/icons-vue"
import { ElIcon, ElDrawer } from 'element-plus';

const props = defineProps({
  buttonTop: {
    type: Number,
    default: 350
  }
})

const buttonTopCss = props.buttonTop + "px"
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <ElIcon :size="24">
      <Setting />
    </ElIcon>
  </div>
  <ElDrawer v-model="show" size="300px" :with-header="false">
    <slot />
  </ElDrawer>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: var(--v3-rightpanel-button-bg-color);
  position: fixed;
  top: v-bind(buttonTopCss);
  right: 0px;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
