<template>
  <div class="match-info">
    <div class="match-info__row">
      <div class="match-info__winner-banner">
        <app-winner-banner :winner="winner" />
      </div>
      <div class="match-info__main main-info">
        <span
          class="match-info__kills match-info__kills--radiant"
          v-text="details.radiant_score"
        />
        <div class="main-info__game game">
          <span class="game__mode" v-text="gameMode" />
          <time class="game__duration" datetime="" v-text="duration" />
          <time class="game__ended" datetime="" v-text="ended" />
        </div>
        <span
          class="match-info__kills match-info__kills--dire"
          v-text="details.dire_score"
        />
      </div>
      <dl class="match-info__additional">
        <dt>ID матча</dt>
        <dd v-text="details.match_id" />
        <dt>Регион</dt>
        <dd v-text="region" />
        <dt>Навык</dt>
        <dd v-text="skill" />
      </dl>
    </div>
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
import AppButton from '@/components/ui/AppButton.vue';
import AppWinnerBanner from '@/components/ui/AppWinnerBanner.vue';
import { MatchDetails, Skill } from '@/types/matches';
import { REGION } from '@/utils/constants';
import { getDuration, getGameMode, getRelativeTime } from '@/utils/helpers';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchInfo',
  components: { AppButton, AppWinnerBanner, FingerPrintIcon, SaveIcon },
  props: {
    details: {
      type: Object as PropType<MatchDetails>,
      required: true,
    },
  },
  computed: {
    skill(): Skill | 'Unknown' {
      return this.details.skill ?? 'Unknown';
    },
    gameMode(): string {
      return getGameMode(this.details.game_mode);
    },
    region(): string {
      return REGION[this.details.region];
    },
    duration(): string {
      return getDuration(this.details.duration);
    },
    isMobile(): boolean {
      return window.innerWidth < 600;
    },
    ended(): string {
      const time = getRelativeTime(this.details.start_time);
      return `${this.isMobile ? '' : 'Закончился '}${time}`;
    },
    winner(): 'dire' | 'radiant' {
      const { radiant_win } = this.details;
      return radiant_win ? 'radiant' : 'dire';
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

  &__row {
    display: grid;
    align-items: end;
    justify-items: center;
    gap: to-rem(20) to-rem(10);
    width: 100%;

    @media screen and (min-width: to-rem(960)) {
      grid-template-columns: repeat(3, 1fr);
      justify-items: stretch;
    }
  }

  &__winner-banner {
    display: flex;
  }

  &__additional {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
    justify-items: end;

    dt {
      font-weight: 700;
      font-size: to-rem(16);
      line-height: to-rem(19);
      color: $color-white;
    }

    dd {
      font-weight: 500;
      font-size: to-rem(14);
      line-height: to-rem(17);
      color: $color-brightest-violet;
    }
  }

  &__kills {
    font-weight: 700;
    font-size: to-rem(50);
    line-height: to-rem(63);

    @media screen and (min-width: to-rem(600)) {
      font-size: to-rem(64);
      line-height: to-rem(77);
    }

    &--radiant {
      color: $color-lime;
    }

    &--dire {
      color: $color-orange;
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: to-rem(10);

    @media screen and (min-width: to-rem(600)) {
      flex-direction: row;
    }
  }
}

.main-info {
  display: flex;
  align-items: center;
  margin: 0;

  @media screen and (min-width: to-rem(600)) {
    gap: to-rem(20);
    margin: 0 to-rem(10);
  }
}

.game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: to-rem(10);
  flex: 1;
  white-space: nowrap;

  &__mode {
    font-weight: 500;
    font-size: to-rem(19);
    line-height: to-rem(22);
    color: $color-white;

    @media screen and (min-width: to-rem(600)) {
      font-size: to-rem(24);
      line-height: to-rem(29);
    }
  }

  &__duration {
    font-weight: 500;
    font-size: to-rem(32);
    line-height: to-rem(39);
    color: $color-white;
  }

  &__ended {
    font-weight: 500;
    font-size: to-rem(16);
    line-height: to-rem(19);
    color: $color-brightest-violet;
  }
}
</style>
