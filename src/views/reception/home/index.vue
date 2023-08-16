<template>
  <div ref="h">
     Hello World!

     ??
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const h = ref<HTMLElement>();

onMounted(() => {
  console.log(h.value);
});

</script>

<style lang="scss" scoped>

</style>

