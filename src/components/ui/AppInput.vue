<template>
  <div
    :class="['app-input', { 'app-input--search': search }]"
    :data-error="hasError"
    @click="onClick"
  >
    <input
      ref="input"
      aria-label="Поиск"
      :value="modelValue"
      @input="onInput"
    />
    <app-button class="app-input__search-button" type="submit" text>
      <template #prepend="{ attrs }">
        <search-icon v-bind="attrs" />
      </template>
    </app-button>
  </div>
</template>

<script lang="ts">
import SearchIcon from '@/assets/search.svg';
import AppButton from '@/components/ui/AppButton.vue';
import type { InputValidationRules } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppInput',
  components: { AppButton, SearchIcon },
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
    search: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array as PropType<InputValidationRules[]>,
      default: () => [],
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
  },
  data() {
    return {
      valid: false,
      errors: [] as (string | boolean)[],
    };
  },
  computed: {
    hasError(): boolean {
      return this.errors.length > 0;
    },
  },
  methods: {
    onInput(e: Event) {
      const input = e.target as HTMLInputElement;
      this.$emit('update:modelValue', input.value);
    },
    onClick() {
      const input = this.$refs.input as HTMLInputElement;
      input.focus();
    },
    validate(): boolean {
      const value = this.modelValue;
      const errors: (string | boolean)[] = [];

      this.rules.forEach((rule) => {
        const valid = typeof rule === 'function' ? rule(value) : rule;

        if (!valid || typeof valid === 'string') errors.push(valid);
      });

      this.errors = errors;

      return errors.length === 0;
    },
  },
  watch: {
    rules: {
      deep: true,
      handler() {
        this.validate();
      },
    },
  },
  beforeMount() {
    this.validate();
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.app-input {
  position: relative;
  display: flex;
  padding: to-rem(17) to-rem(10) to-rem(12);
  color: $color-black;
  transition: color 0.25s ease-out;
  border-radius: to-rem(4) to-rem(4) to-rem(1) to-rem(1);
  cursor: text;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: $color-light-gray;
    border-radius: to-rem(4);
    height: to-rem(2);
    transition: background 0.25s ease-out;
  }

  &:hover::after {
    background: $color-black;
  }

  &:has(input:focus) {
    &:after {
      background: $color-bright-violet;
    }
  }

  &[data-error='true'] {
    &::after {
      background: $color-orange !important;
    }

    input {
      color: $color-orange;
    }
  }

  &--search {
    color: $color-white;
    background: rgba($color-shade-violet, 0.25);
    padding: to-rem(12.5) to-rem(10) to-rem(9.5);

    &:hover::after {
      background: rgba($color-white, 50%);
    }

    &:has(input:focus) {
      &:after {
        background: $color-lime;
      }
    }
  }

  input {
    color: inherit;
    font-weight: 500;
    font-size: to-rem(16);
    line-height: to-rem(19);
    background: transparent;
    border: none;
    width: 100%;
    padding: 0;

    &:focus {
      outline: none;
    }
  }

  &__search-button {
    padding: 0 !important;
  }
}
</style>
