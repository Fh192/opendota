<template>
  <app-button
    class="scroll-button"
    color="violet"
    :size="size"
    @click="onClick"
  >
    <template #prepend="{ attrs }">
      <arrow-icon v-bind="attrs" transform="rotate(-90)" />
    </template>
  </app-button>
</template>

<script lang="ts">
import ArrowIcon from '@/assets/arrow.svg';
import AppButton from '@/components/ui/AppButton.vue';
import { ButtonSize } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScrollButton',
  components: { AppButton, ArrowIcon },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onClick() {
      this.scrollToTop();
    },
  },
  computed: {
    size(): ButtonSize {
      return window.innerWidth < 600 ? 'sm' : 'md';
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';

.scroll-button {
  position: fixed;
  bottom: to-rem(60);
  right: to-rem(50);
}
</style>
