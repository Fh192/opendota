<template>
  <div :class="['winner-banner', `winner-banner--${winner}`]">
    <dire-icon v-if="winner === 'dire'" />
    <radiant-icon v-else />
    <span class="winner-banner__text" v-text="text" />
  </div>
</template>

<script lang="ts">
import DireIcon from '@/assets/dire.svg';
import RadiantIcon from '@/assets/radiant.svg';
import AppButton from '@/components/ui/AppButton.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppWinnerBanner',
  components: { AppButton, DireIcon, RadiantIcon },
  props: {
    winner: {
      type: String as PropType<'dire' | 'radiant'>,
      required: true,
    },
  },
  computed: {
    text(): string {
      return `Победа: ${this.winner === 'dire' ? 'Dire' : 'Radiant'}`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.winner-banner {
  display: flex;
  align-items: center;
  gap: to-rem(10);
  padding: to-rem(10) to-rem(15);
  border-radius: to-rem(10);
  background: $color-white;
  white-space: nowrap;

  &--dire .winner-banner__text {
    color: #5e6f00;
  }

  &--radiant .winner-banner__text {
    color: #7d3800;
  }

  &__text {
    font-weight: 700;
    font-size: to-rem(20);
    line-height: to-rem(24);
  }
}
</style>
