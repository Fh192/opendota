<template>
  <div class="tooltip">
    <slot name="activator" v-bind="activatorProps" />
    <div
      v-show="shown"
      class="tooltip__content"
      ref="tooltip"
      :style="{ maxWidth, top, left }"
    >
      <div class="tooltip__content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppButton from './AppButton.vue';

export default defineComponent({
  name: 'AppTooltip',
  components: { AppButton },
  props: {
    maxWidth: {
      type: String,
      default: 'unset',
    },
  },
  data() {
    return {
      shown: false,
      top: '0px',
      left: '0px',
    };
  },
  computed: {
    activatorProps() {
      return {
        on: {
          mouseenter: () => (this.shown = true),
          mouseleave: () => (this.shown = false),
        },
      };
    },
  },
  watch: {
    shown: {
      immediate: true,
      handler(shown: boolean) {
        this.$nextTick(() => {
          const tooltip = this.$refs.tooltip as HTMLElement | undefined;

          if (!shown || !tooltip) return undefined;

          this.top = `-${tooltip.clientHeight + 10 + 5}px`;
          this.left = `-${tooltip.clientWidth / 2 - 10}px`;
        });
      },
    },
    top(top) {
      console.log(top);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.tooltip {
  position: relative;

  &__content {
    position: absolute;
    z-index: 999;
    box-shadow: to-rem(0) to-rem(25) to-rem(80) to-rem(-25) rgba(0, 0, 0, 0.5);
    background: $color-bright-violet;
    border-radius: to-rem(4);
  }

  &__content-inner {
    position: relative;
    padding: to-rem(20);
    white-space: pre-wrap;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: $color-bright-violet transparent;
      border-width: to-rem(10) to-rem(10) 0;
      border-radius: to-rem(4);
      transform: translate(-50%);
      left: 50%;
      bottom: to-rem(-9);
    }
  }
}
</style>
