<template>
  <span :class="['badge', { 'badge--winner': winner }]" v-text="text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppBadge',
  props: {
    winner: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    text(): string {
      return this.winner ? 'Победители' : 'Проигравшие';
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.badge {
  padding: to-rem(5) to-rem(15);
  border-radius: to-rem(30);
  color: $color-orange;
  background: rgba($color-orange, 0.25);

  &--winner {
    color: $color-lime;
    background: rgba($color-lime, 0.25);
  }
}
</style>
