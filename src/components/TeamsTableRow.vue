<template>
  <tr class="list-item">
    <td class="list-item__column" v-text="order" />
    <td class="list-item__column column">
      <img class="column__team-logo" :src="team.logo_url" :alt="team.name" />
      <div class="column__inner column__inner--no-gap">
        <router-link
          class="column__team-name"
          :to="`/teams/${team.team_id}/matches`"
          :aria-label="`Матчи команды ${team.name}`"
          v-text="team.name"
        />
        {{ ended }}
      </div>
    </td>
    <td class="list-item__column column">
      <div class="column__inner">
        {{ rating }}
        <app-progress :value="ratingPercent" />
      </div>
    </td>
    <td class="list-item__column">
      <div class="column__inner">
        {{ wins }}
        <app-progress :value="winsPercent" />
      </div>
    </td>
    <td class="list-item__column">
      <div class="column__inner">
        {{ losses }}
        <app-progress :value="lossesPercent" />
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import AppProgress from '@/components/ui/AppProgress.vue';
import { MaxTeamValues, Team } from '@/types/teams';
import { getNumberWithOrdinal, getRelativeTime } from '@/utils/helpers';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TeamsTableRow',
  components: { AppProgress },
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    maxValues: {
      type: Object as PropType<MaxTeamValues>,
      required: true,
    },
  },
  computed: {
    order(): string {
      return getNumberWithOrdinal(this.index + 1);
    },
    wins(): number {
      return Math.floor(this.team.wins);
    },
    losses(): number {
      return Math.floor(this.team.losses);
    },
    rating(): number {
      return Math.floor(this.team.rating);
    },
    winsPercent(): number {
      return (this.wins * 100) / this.maxValues.wins;
    },
    lossesPercent(): number {
      return (this.losses * 100) / this.maxValues.losses;
    },
    ratingPercent(): number {
      return (this.rating * 100) / this.maxValues.rating;
    },
    ended(): string {
      return getRelativeTime(this.team.last_match_time);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.list-item {
  grid-template-columns: to-rem(128) 1fr repeat(3, to-rem(128));
  gap: to-rem(20);

  @media screen and (min-width: to-rem(600)) {
    grid-template-columns: to-rem(128) 1fr repeat(3, to-rem(128));
  }

  &__column {
    gap: to-rem(10);
  }
}

.column {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: to-rem(10);
    width: 100%;

    &--no-gap {
      gap: 0;
    }
  }

  &__team-logo {
    max-width: to-rem(40);
    max-height: to-rem(40);
  }

  &__team-name {
    font-weight: 500;
    font-size: to-rem(24);
    line-height: to-rem(29);
    color: $color-lime;
    text-decoration: none;
  }
}
</style>
