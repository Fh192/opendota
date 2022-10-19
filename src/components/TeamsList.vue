<template>
  <app-table :loading="loading">
    <template #header>
      <teams-list-header />
    </template>
    <template #body>
      <teams-list-item
        v-for="(team, index) in teams"
        :team="team"
        :index="index"
        :max-values="maxValues"
        :key="team.team_id"
      />
    </template>
    <template #footer>
      <teams-list-footer />
    </template>
  </app-table>
</template>

<script lang="ts">
import TeamsListFooter from '@/components/TeamsListFooter.vue';
import TeamsListHeader from '@/components/TeamsListHeader.vue';
import TeamsListItem from '@/components/TeamsListItem.vue';
import AppTable from '@/components/ui/AppTable.vue';
import { MaxTeamValues, Team } from '@/types/teams';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TeamsList',
  components: { TeamsListHeader, TeamsListItem, TeamsListFooter, AppTable },
  props: {
    teams: {
      type: Array as PropType<Team[]>,
      required: true,
      default: () => [],
    },
    maxValues: {
      type: Object as PropType<MaxTeamValues>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
