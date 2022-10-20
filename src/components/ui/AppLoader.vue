<template>
  <div class="app-loader">
    <spinner-icon :width="size" :height="size" />
  </div>
</template>

<script lang="ts">
import SpinnerIcon from '@/assets/spinner.svg';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLoader',
  components: { SpinnerIcon },
  props: {
    size: {
      type: [String, Number],
      default: '38',
    },
  },
});
</script>

<style lang="scss" scoped>
.app-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
