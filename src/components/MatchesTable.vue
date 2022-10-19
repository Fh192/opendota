<template>
  <app-table :loading="loading">
    <template #header>
      <matches-table-header />
    </template>
    <template #body>
      <matches-table-row
        v-for="match in matches"
        :match="match"
        :team="team"
        :is-public="isPublic"
        :key="match.match_id"
      />
    </template>
    <template #footer> </template>
  </app-table>
</template>

<script lang="ts">
import MatchesTableHeader from '@/components/MatchesTableHeader.vue';
import MatchesTableRow from '@/components/MatchesTableRow.vue';
import AppTable from '@/components/ui/AppTable.vue';
import { PublicMatch, TeamMatch } from '@/types/matches';
import { Team } from '@/types/teams';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchesTable',
  components: {
    AppTable,
    MatchesTableHeader,
    MatchesTableRow,
  },
  props: {
    matches: {
      type: Array as PropType<PublicMatch[] | TeamMatch[]>,
      required: true,
      default: () => [],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Object as PropType<Team | null>,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
