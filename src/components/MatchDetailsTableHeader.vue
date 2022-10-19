<template>
  <tr class="header-row">
    <th
      v-for="column in columns"
      class="header-column"
      :key="column"
      v-text="column"
    />
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MatchDetailsTableHeader',
  data() {
    return {
      columns: [
        'Игрок',
        'LVL',
        'K',
        'D',
        'A',
        'LH/DN',
        'NET',
        'GMP/XPM',
        'HD',
        'TD',
        'HH',
        'Предметы / Бафы',
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.header-row {
  grid-template-columns:
    to-rem(200) to-rem(40)
    repeat(3, to-rem(30)) to-rem(70) to-rem(60)
    to-rem(100) to-rem(50) to-rem(40) to-rem(50) 1fr;
}

.header-column {
  &:nth-child(3) {
    color: $color-lime;
  }

  &:nth-child(4) {
    color: $color-orange;
  }

  &:nth-child(7) {
    color: $color-yellow;
  }
}
</style>
