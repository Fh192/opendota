<template>
  <tr class="footer-row">
    <td class="footer-col">
      <app-tooltip max-width="468px">
        <template #activator="{ on }">
          <info-icon v-on="on" fill="#fff" width="20" height="20" />
        </template>
        Последующий анализ собранных общедоступных профилей игроков от OpenDota
        показывает наиболее высокий средний MMR, примерно 3100.
      </app-tooltip>
      <span class="footer-col__text footer-col__text--white">
        Team Elo Rankings
      </span>
      <span class="footer-col__text"> k=32, init=1000 </span>
    </td>
  </tr>
</template>

<script lang="ts">
import InfoIcon from '@/assets/info.svg';
import AppTooltip from '@/components/ui/AppTooltip.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeamsListFooter',
  components: { InfoIcon, AppTooltip },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.footer-row {
  display: flex;
  align-items: center;
  padding: to-rem(20);
}

.footer-col {
  display: flex;
  align-items: center;
  gap: to-rem(10);

  &__text {
    font-weight: 600;
    font-size: to-rem(16);
    line-height: to-rem(19);
    color: $color-brightest-violet;

    &--white {
      color: $color-white;
    }
  }
}
</style>
