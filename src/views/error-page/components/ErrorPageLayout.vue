<template>
  <div class="error-page">
    <div class="error-page-svg">
      <slot />
    </div>
    <!-- <router-link to="/"> -->
      <ElButton @click="toRootPath" type="primary">回到首页</ElButton>
    <!-- </router-link> -->
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus';

import { useRouter } from 'vue-router';

const router = useRouter();

const toRootPath = () => {

  console.log(1);
  router.replace('/reception/home');

}

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
