<template>
  <app-caption>Список матчей</app-caption>
  <matches-table
    :matches="slicedMatches"
    :team="team"
    :is-public="isPublic"
    :loading="loading"
  />
  <app-button v-if="!ended" class="button" @click="onButtonClick">
    {{ error ? 'Ошибка' : 'Загрузить еще' }}
  </app-button>
</template>

<script lang="ts">
import { getPublicMatches } from '@/api/matches';
import { getTeam, getTeamMatches } from '@/api/teams';
import MatchesTable from '@/components/MatchesTable.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCaption from '@/components/ui/AppCaption.vue';
import { PublicMatch, TeamMatch } from '@/types/matches';
import { Team } from '@/types/teams';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MatchesPage',
  components: { AppCaption, AppButton, MatchesTable },
  data() {
    return {
      matches: [] as PublicMatch[] | TeamMatch[],
      team: null as Team | null,
      slice: 10,
      loading: false,
      error: false,
      ended: false,
    };
  },
  computed: {
    isPublic(): boolean {
      return this.$route.name === 'matches-page';
    },
    teamId(): number {
      if (this.isPublic) return 0;
      return +this.$route.params.teamId;
    },
    slicedMatches(): PublicMatch[] | TeamMatch[] {
      return this.matches.slice(0, this.slice);
    },
  },
  methods: {
    async getMatches() {
      try {
        const { isPublic, teamId } = this;

        if (isPublic) {
          this.matches = await getPublicMatches();
        } else {
          this.matches = await getTeamMatches(teamId);
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getTeam() {
      try {
        if (this.isPublic) return undefined;

        const team = await getTeam(this.teamId);
        this.team = team;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchData() {
      try {
        this.loading = true;
        await Promise.allSettled([this.getMatches(), this.getTeam()]);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    onButtonClick() {
      this.slice += 10;
    },
  },
  watch: {
    slice(value) {
      this.ended = value >= this.matches.length;
    },
    '$route.fullPath': {
      immediate: true,
      async handler() {
        this.matches = [];
        this.team = null;
        this.slice = 10;
        this.ended = false;

        await this.fetchData();
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  margin: 0 auto;
}
</style>
