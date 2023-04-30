<script lang="ts" setup>
import { type PropType } from "vue"
import { type IListItem } from "./data"

const props = defineProps({
  list: {
    type: Object as PropType<IListItem[]>,
    required: true
  }
})

import { ElEmpty, ElCard, ElTag } from 'element-plus';
</script>

<template>
  <ElEmpty v-if="props.list.length === 0" />
  <ElCard v-else v-for="(item, index) in props.list" :key="index" shadow="never" class="card-container">
    <template #header>
      <div class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
            <ElTag v-if="item.extra" :type="item.status" effect="plain" size="small">{{ item.extra }}</ElTag>
          </span>
          <div class="card-time">{{ item.datetime }}</div>
        </div>
        <div v-if="item.avatar" class="card-avatar">
          <img :src="item.avatar" width="34" />
        </div>
      </div>
    </template>
    <div class="card-body">
      {{ item.description ?? "No Data" }}
    </div>
  </ElCard>
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }
    .card-time {
      font-size: 12px;
      color: grey;
    }
    .card-avatar {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
