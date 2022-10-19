<template>
  <input class="input" :value="modelValue" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppInput',
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
  },
  emits: {
    'update:modelValue': (value: string) => value,
  },
  methods: {
    onInput(e: Event): Event {
      const input = e.target as HTMLInputElement;
      this.$emit('update:modelValue', input.value);

      return e;
    },
  },
});
</script>

<style lang="scss" scoped></style>
