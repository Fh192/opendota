<template>
  <div class="match-info">
    <match-details-info-row :details="details" />
    <div class="match-info__buttons">
      <app-button :block="isMobile">
        <template #prepend="{ attrs }">
          <finger-print-icon v-bind="attrs" />
        </template>
        Анализ
      </app-button>
      <app-button
        :href="details.replay_url"
        :block="isMobile"
        type="application/zip"
      >
        <template #prepend="{ attrs }">
          <save-icon v-bind="attrs" />
        </template>
        Загрузить запись
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import FingerPrintIcon from '@/assets/finger-print.svg';
import SaveIcon from '@/assets/save.svg';
import MatchDetailsInfoRow from '@/components/MatchDetailsInfoRow.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppWinnerBanner from '@/components/ui/AppWinnerBanner.vue';
import { MatchDetails } from '@/types/matches';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchInfo',
  components: {
    AppButton,
    AppWinnerBanner,
    MatchDetailsInfoRow,
    FingerPrintIcon,
    SaveIcon,
  },
  props: {
    details: {
      type: Object as PropType<MatchDetails>,
      required: true,
    },
  },
  computed: {
    isMobile(): boolean {
      return window.innerWidth < 600;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.match-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: to-rem(20);

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: to-rem(10);

    @media screen and (min-width: to-rem(600)) {
      flex-direction: row;
    }
  }
}
</style>
