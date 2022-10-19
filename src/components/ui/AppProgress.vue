<template>
  <div class="progress">
    <div
      :class="['progress__bar', `progress__bar--${color}`]"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppProgress',
  props: {
    value: {
      type: Number,
      required: true,
      default: 0,
      validator(value: number) {
        return value >= 0 && value <= 100;
      },
    },
  },
  computed: {
    color(): string {
      const { value } = this;

      if (value === 100) return 'violet';
      if (value < 100 && value >= 70) return 'lime';
      if (value < 70 && value >= 40) return 'yellow';

      return 'orange';
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.progress {
  height: to-rem(4);
  border-radius: to-rem(4);
  background-color: $color-shade-violet;
  overflow: hidden;
  width: 100%;

  &__bar {
    background-color: #000;
    transition: width 0.5s ease-in-out;
    border-radius: inherit;
    height: inherit;

    &--violet {
      background-color: $color-bright-violet;
    }

    &--lime {
      background-color: $color-lime;
    }

    &--yellow {
      background-color: $color-yellow;
    }

    &--orange {
      background-color: $color-orange;
    }
  }
}
</style>
