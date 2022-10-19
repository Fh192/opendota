<template>
  <app-caption>Детальная информация матча</app-caption>
  <template v-if="details">
    <match-info :details="details" />
    <match-details-table
      faction="Radiant"
      :loading="loading"
      :players="players.radiant"
      :radiant-win="details.radiant_win"
    />
    <match-details-table
      faction="Dire"
      :loading="loading"
      :players="players.dire"
      :radiant-win="details.radiant_win"
    />
  </template>
  <app-loader v-else size="50" />
</template>

<script lang="ts">
import { getMatchDetails } from '@/api/matches';
import MatchInfo from '@/components/MatchDetailsInfo.vue';
import MatchDetailsTable from '@/components/MatchDetailsTable.vue';
import AppCaption from '@/components/ui/AppCaption.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { Faction, MatchDetails, Player } from '@/types/matches';
import { defineComponent } from 'vue';

type Players = Record<Faction, Player[]>;

export default defineComponent({
  name: 'MatchDetailsPage',
  components: { AppCaption, MatchInfo, MatchDetailsTable, AppLoader },
  data() {
    return {
      details: null as MatchDetails | null,
      loading: false,
    };
  },
  computed: {
    players(): Players {
      const { details } = this;
      const players: Players = { dire: [], radiant: [] };

      if (details) {
        details.players.forEach((player) => {
          if (player.isRadiant) {
            players.radiant.push(player);
          } else {
            players.dire.push(player);
          }
        });
      }

      return players;
    },
  },
  methods: {
    async getMatchDetails() {
      try {
        this.loading = true;

        const { id } = this.$route.params;
        const details = await getMatchDetails(+id);

        this.details = details;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.getMatchDetails();
  },
});
</script>

<style lang="scss" scoped></style>
