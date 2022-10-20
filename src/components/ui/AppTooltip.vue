<template>
  <slot name="activator" v-bind="activatorProps" />
  <teleport v-if="initialized" to="body">
    <transition name="dissolve">
      <div
        v-show="shown"
        class="tooltip__content"
        ref="tooltip"
        :style="{ top, left, maxWidth: computedMaxWidth }"
      >
        <span class="tooltip__content-inner">
          <slot />
        </span>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTooltip',
  props: {
    maxWidth: {
      type: String,
      default: 'unset',
    },
  },
  data() {
    return {
      top: '0px',
      left: '0px',
      shown: false,
      initialized: false,
      target: null as HTMLElement | null,
    };
  },
  computed: {
    computedMaxWidth(): string {
      const maxWidth = parseInt(this.maxWidth);
      return `${innerWidth > maxWidth ? maxWidth : innerWidth - 12}px`;
    },
    activatorProps() {
      return {
        on: {
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
        },
      };
    },
  },
  methods: {
    onMouseEnter(e: MouseEvent) {
      this.shown = true;
      this.initialized = true;
      this.target = e.target as HTMLElement;
    },
    onMouseLeave(e: MouseEvent) {
      this.shown = false;
    },
  },
  watch: {
    shown: {
      immediate: true,
      async handler(shown: boolean) {
        if (!shown) return undefined;

        await this.$nextTick();

        const { target } = this;
        const tooltip = this.$refs.tooltip as HTMLElement | undefined;

        if (!tooltip || !target) return undefined;

        const { clientHeight, clientWidth } = tooltip;
        const rect = target.getBoundingClientRect();
        const left = rect.left - clientWidth / 2 + rect.width / 2;

        this.top = `${rect.top - clientHeight + scrollY - 12}px`;
        this.left = `${left < 12 ? 12 : left}px`;
      },
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.tooltip {
  &__content {
    position: absolute;
    z-index: 999;
    display: flex;
    box-shadow: to-rem(0) to-rem(25) to-rem(80) to-rem(-25) rgba(0, 0, 0, 0.5);
    background: $color-bright-violet;
    border-radius: to-rem(4);
  }

  &__content-inner {
    position: relative;
    padding: to-rem(20);
    white-space: normal;

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
