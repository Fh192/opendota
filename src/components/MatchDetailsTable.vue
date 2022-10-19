<template>
  <app-table :loading="loading">
    <template #append>
      <span class="text--white" v-text="faction" />
      <span>стастистика комманды</span>
      <app-badge :winner="isWinner" />
    </template>
    <template #header>
      <match-details-table-header />
    </template>
    <template #body>
      <match-details-table-row
        v-for="(player, i) in players"
        :player="player"
        :key="player.account_id ?? player.hero_id"
      />
    </template>
  </app-table>
</template>

<script lang="ts">
import AppTable from '@/components/ui/AppTable.vue';
import { Faction, Player } from '@/types/matches';
import { defineComponent, PropType } from 'vue';
import MatchDetailsTableHeader from './MatchDetailsTableHeader.vue';
import MatchDetailsTableRow from './MatchDetailsTableRow.vue';
import AppBadge from './ui/AppBadge.vue';

export default defineComponent({
  name: 'MatchDetailsTable',
  components: {
    AppTable,
    MatchDetailsTableHeader,
    MatchDetailsTableRow,
    AppBadge,
  },
  props: {
    players: {
      type: Array as PropType<Player[]>,
      required: true,
      default: () => [],
    },
    faction: {
      type: String as PropType<Capitalize<Faction>>,
      required: true,
    },
    radiantWin: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isWinner(): boolean {
      const { faction, radiantWin } = this;
      return (
        (faction === 'Radiant' && radiantWin) ||
        (faction === 'Dire' && !radiantWin)
      );
    },
  },
});
</script>
