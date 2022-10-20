<template>
  <component
    :is="component"
    :class="classNames"
    :aria-disabled="disabled || loading"
    :disabled="disabled || loading"
    :to="to"
    :href="href"
  >
    <slot name="prepend" :attrs="iconAttrs" />
    <slot />
    <slot name="append" :attrs="iconAttrs" />
  </component>
</template>

<script lang="ts">
import { ButtonColor, ButtonSize } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppButton',
  props: {
    outlined: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'md',
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: 'white',
    },
    text: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
    },
    href: {
      type: String,
    },
  },
  computed: {
    component() {
      return this.to ? 'router-link' : this.href ? 'a' : 'button';
    },
    hasIcon(): boolean {
      return !!this.$slots.append || !!this.$slots.prepend;
    },
    onlyIcon(): boolean {
      return this.hasIcon && !this.$slots.default;
    },
    iconAttrs() {
      return {
        width: '24',
        height: '24',
        fill: 'currentColor',
      };
    },
    classNames() {
      return [
        'button',
        `button--${this.color}`,
        `button--${this.size}`,
        {
          'button--loading': this.loading,
          'button--disabled': this.disabled,
          'button--block': this.block,
          'button--text': this.text,
          'button--outlined': this.outlined,
          'button--with-icon': this.hasIcon && !this.onlyIcon,
          'button--icon': this.onlyIcon,
        },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.button {
  display: inline-flex;
  align-items: center;
  gap: to-rem(10);
  border: none;
  border-radius: to-rem(4);
  transition: all 0.25s ease-out;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  font-size: to-rem(16);
  line-height: to-rem(19);

  &--disabled {
    cursor: default;
    pointer-events: none;
  }

  &--block {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &--white {
    color: $color-black;
    background-color: $color-white;

    &:hover {
      background-color: $color-light-gray;
    }

    &.button--disabled {
      color: $color-light-gray;
      background-color: $color-gray;
    }

    &.button--text,
    &.button--outlined {
      color: $color-white;

      &:hover {
        color: $color-lime;
      }

      &.button--disabled {
        color: $color-gray;
      }
    }
  }

  &--black {
    color: $color-black;

    &:hover {
      color: $color-lime;
    }

    &.button--disabled {
      color: $color-light-gray;
    }
  }

  &--violet {
    color: $color-white;
    background-color: $color-bright-violet;

    &:hover {
      background-color: $color-lime;
    }

    &.button--disabled {
      color: $color-gray;
      background-color: $color-dark-gray;
    }
  }

  &--text,
  &--outlined {
    background-color: transparent;

    &:hover,
    &.button--disabled {
      background-color: transparent;
    }
  }

  &--outlined {
    border: to-rem(2) solid currentColor;
    border-radius: to-rem(2);
  }

  &--text {
    border: none;
    font-weight: 700;
  }

  &--icon {
    gap: 0;
  }

  &--md {
    padding: to-rem(16) to-rem(20);

    &.button--with-icon {
      padding: to-rem(13) to-rem(20);
    }

    &.button--icon {
      padding: to-rem(20);
    }
  }

  &--sm {
    padding: to-rem(10) to-rem(14);

    &.button--with-icon {
      padding: to-rem(7) to-rem(14);
    }

    &.button--icon {
      padding: to-rem(10);
    }
  }
}
</style>
