<template>
  <tr class="header-row">
    <th v-for="column in columns" :key="column" v-text="column" />
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeamsTableHeader',
  data() {
    return {
      columns: ['Ранг', 'Название команды', 'Рейтинг', 'Победы', 'Проигрыши'],
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';

.header-row {
  grid-template-columns: to-rem(128) 1fr repeat(3, to-rem(128));
  gap: to-rem(20);
}
</style>
