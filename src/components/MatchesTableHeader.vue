<template>
  <tr class="header-row">
    <th v-for="column in columns" :key="column" v-text="column" />
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MatchesTableHeader',
  data() {
    return {
      columns: ['ID', 'Длительность', 'Radiant', 'Dire'],
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';

.header-row {
  grid-template-columns:
    to-rem(120) to-rem(130)
    repeat(2, to-rem(70));

  @media screen and (min-width: to-rem(600)) {
    grid-template-columns:
      to-rem(240) to-rem(220)
      to-rem(268) to-rem(248);
  }
}
</style>
