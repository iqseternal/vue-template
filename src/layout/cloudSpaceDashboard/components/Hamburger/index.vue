<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue"
import { ElIcon } from 'element-plus';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: "toggle-click"): void
}>()

const toggleClick = () => {
  emit("toggle-click")
}


</script>

<template>
  <div @click="toggleClick">
    <ElIcon :size="20" class="icon">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </ElIcon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
