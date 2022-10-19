<template>
  <tr class="table-row">
    <td class="table-column">
      <div
        class="table-column__hero-image-wrapper"
        :style="{ '--color': playerColor }"
      >
        <img class="table-column__hero-image" :src="heroImage" alt="" />
      </div>
      <div class="table-column__player-info">
        <router-link
          v-if="player.name"
          class="table-column__username"
          :to="`/players/${player.account_id}`"
          v-text="player.name"
        />
        <span v-else class="table-column__username">Anonymous</span>
        <span class="table-column__rank" v-text="playerRank" />
      </div>
    </td>
    <td
      v-for="(stat, i) in stats"
      class="table-column"
      :key="i + '' + stat"
      v-text="stat"
    />
    <td class="table-column">
      <match-details-table-row-items :player="player" />
    </td>
  </tr>
</template>

<script lang="ts">
import BackpackIcon from '@/assets/backpack.svg';
import MatchDetailsTableRowItems from '@/components/MatchDetailsTableRowItems.vue';
import { Player } from '@/types/matches';
import { ASSETS_URL, HEROES, PLAYER_COLORS } from '@/utils/constants';
import { getRank, kFormatter } from '@/utils/helpers';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchDetailsTableRow',
  components: { BackpackIcon, MatchDetailsTableRowItems },
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true,
      default: () => [],
    },
  },
  computed: {
    heroImage(): string {
      const { hero_id } = this.player;
      return `${ASSETS_URL}${HEROES[hero_id].img}`;
    },
    stats() {
      const { player } = this;

      return [
        kFormatter(player.level),
        kFormatter(player.kills),
        kFormatter(player.deaths),
        kFormatter(player.assists),
        `${kFormatter(player.last_hits)}/${kFormatter(player.denies)}`,
        kFormatter(player.net_worth),
        `${kFormatter(player.gold_per_min)}/${kFormatter(player.xp_per_min)}`,
        kFormatter(player.hero_damage),
        kFormatter(player.tower_damage),
        kFormatter(player.hero_healing),
      ];
    },
    playerColor() {
      return PLAYER_COLORS[this.player.player_slot];
    },
    playerRank(): string {
      return getRank(this.player.rank_tier);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.table-row {
  grid-template-columns:
    to-rem(200) to-rem(40)
    repeat(3, to-rem(30)) to-rem(70) to-rem(60)
    to-rem(100) to-rem(50) to-rem(40) to-rem(50) 1fr;
}

.table-column {
  font-weight: 500;
  font-size: to-rem(14);
  line-height: to-rem(17);
  gap: to-rem(10);

  &:nth-child(3) {
    color: $color-lime;
  }

  &:nth-child(4) {
    color: $color-orange;
  }

  &:nth-child(7) {
    color: $color-yellow;
  }

  &__hero-image-wrapper {
    width: to-rem(40);
    height: to-rem(27);
    border-radius: to-rem(2);
    position: relative;
    overflow: hidden;

    &::before {
      content: ' ';
      position: absolute;
      width: to-rem(4);
      height: 100%;
      background: var(--color);
    }
  }

  &__hero-image {
    height: inherit;
    object-fit: cover;
    padding-left: to-rem(4);
  }

  &__username {
    font-weight: 500;
    font-size: to-rem(16);
    line-height: to-rem(19);
    color: $color-lime;
    text-decoration: none;
  }

  &__rank {
    font-size: to-rem(12);
    line-height: to-rem(15);
  }

  &__player-info {
    display: flex;
    flex-direction: column;
  }
}
</style>
