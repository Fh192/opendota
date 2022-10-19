<template>
  <ul class="heroes-list">
    <li v-for="hero in heroes" class="heroes-list__item" :key="hero.id">
      <img :src="hero.img" :alt="hero.name" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Hero } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchesTableRowHeroes',
  props: {
    heroes: {
      type: Array as PropType<Hero[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.heroes-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: to-rem(2);

  @media screen and (min-width: to-rem(600)) {
    flex-direction: row;
  }

  &__item {
    width: to-rem(48);
    height: to-rem(27);
    border-radius: to-rem(4);
    list-style-type: none;
    overflow: hidden;

    img {
      height: inherit;
      object-fit: cover;
    }
  }
}
</style>
