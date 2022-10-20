<template>
  <app-caption>Список команд</app-caption>
  <teams-list :teams="slicedTeams" :max-values="maxValues" :loading="loading" />
  <app-button class="button" :disabled="loading" @click="onButtonClick">
    {{ error ? 'Ошибка' : 'Загрузить еще' }}
  </app-button>
</template>

<script lang="ts">
import { getTeams } from '@/api/teams';
import TeamsList from '@/components/TeamsTable.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCaption from '@/components/ui/AppCaption.vue';
import { MaxTeamValues, Team } from '@/types/teams';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeamsPage',
  components: { TeamsList, AppButton, AppCaption },
  data() {
    return {
      teams: [] as Team[],
      loading: false,
      error: false,
      total: 0,
      page: 0,
      slice: 10,
    };
  },
  computed: {
    slicedTeams(): Team[] {
      return this.teams.slice(0, this.slice);
    },
    maxWins(): number {
      return Math.max(...this.teams.map(({ wins }) => wins));
    },
    maxValues(): MaxTeamValues {
      const wins: number[] = [];
      const losses: number[] = [];
      const rating: number[] = [];

      this.teams.forEach((team) => {
        wins.push(team.wins);
        losses.push(team.losses);
        rating.push(team.rating);
      });

      return {
        wins: Math.max(...wins),
        losses: Math.max(...losses),
        rating: Math.max(...rating),
      };
    },
  },
  methods: {
    async getTeams(): Promise<Team[]> {
      try {
        this.loading = true;
        this.error = false;

        const teams = await getTeams(this.page);
        this.total += teams.length;

        return teams;
      } catch (err) {
        this.error = true;
        console.error(err);

        return [];
      } finally {
        this.loading = false;
      }
    },
    onButtonClick() {
      if (this.slice >= this.total) {
        this.page += 1;
      } else {
        this.slice += 10;
      }
    },
  },
  watch: {
    page: {
      immediate: true,
      async handler() {
        const teams = await this.getTeams();
        this.teams.push(...teams);
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
