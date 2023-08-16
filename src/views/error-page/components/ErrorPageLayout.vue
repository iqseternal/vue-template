<template>
  <div class="error-page">
    <div class="error-page-svg">
      <slot />
    </div>
    <section>
      <ElButton @click="() => $router.replace(RECEPTION_PATH)" type="primary">回到首页</ElButton>
      <ElButton @click="() => $router.replace(DASHBOARD_LOGIN_PATH)" type="primary">回到控制台</ElButton>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus';

import { RECEPTION_PATH, DASHBOARD_LOGIN_PATH } from '@router/constant';
</script>

<style lang="scss" scoped>

.error-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-svg {
    width: 400px;
    margin-bottom: 50px;
  }
}
</style>
