<template>
  <h1 class="caption">
    <slot />
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppCaption',
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';

.caption {
  font-weight: 700;
  font-size: to-rem(24);
  line-height: to-rem(29);
  text-transform: uppercase;
  background: linear-gradient(268.55deg, #ebc1ff 0%, #e0d8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: to-rem(0) to-rem(8) to-rem(16) rgba(16, 0, 37, 0.15);

  @media screen and (min-width: to-rem(600)) {
    font-size: to-rem(48);
    line-height: to-rem(58);
  }
}
</style>
