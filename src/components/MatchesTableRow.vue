<template>
  <tr :class="['table-row', { 'table-row--public': isPublic }]">
    <td class="table-col">
      <router-link
        class="table-col__link"
        :to="`/matches/${match.match_id}`"
        v-text="match.match_id"
      />
      <app-tooltip>
        <template #activator="{ on }">
          <div v-on="on" class="table-col__info">
            <time v-text="ended" />
            <span class="table-col__info-separator">&nbsp;/&nbsp;</span>
            <span v-text="type" />
          </div>
        </template>
        {{ endedDate }}
      </app-tooltip>
    </td>
    <td class="table-col">
      <time datetime="" v-text="duration" />
    </td>
    <template v-if="isPublic">
      <td v-for="{ heroes, id } in teamsHeroes" class="table-col" :key="id">
        <matches-table-row-heroes :heroes="heroes" />
      </td>
    </template>
    <td v-else v-for="team in teams" class="table-col" :key="team.id">
      <router-link class="table-col__team" :to="`/teams/${team.id}/matches`">
        <img class="table-col__team-logo" :src="team.logo" :alt="team.name" />
        <span class="table-col__team-name" v-text="team.name" />
      </router-link>
    </td>
  </tr>
</template>

<script lang="ts">
import MatchesTableRowHeroes from '@/components/MatchesTableRowHeroes.vue';
import AppProgress from '@/components/ui/AppProgress.vue';
import AppTooltip from '@/components/ui/AppTooltip.vue';
import { Hero } from '@/types';
import { PublicMatch, TeamMatch } from '@/types/matches';
import { Team } from '@/types/teams';
import { ASSETS_URL, HEROES } from '@/utils/constants';
import { getDuration, getRank, getRelativeTime } from '@/utils/helpers';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchesTableRow',
  components: { AppProgress, AppTooltip, MatchesTableRowHeroes },
  props: {
    match: {
      type: Object as PropType<PublicMatch | TeamMatch>,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Object as PropType<Team | null>,
      default: null,
    },
  },
  computed: {
    type(): string {
      if (!this.isPublic) return (this.match as TeamMatch).league_name;
      return getRank((this.match as PublicMatch).avg_rank_tier);
    },
    radiantHeroes(): Hero[] {
      if (!this.isPublic) return [];
      const { radiant_team } = this.match as PublicMatch;

      return radiant_team.split(',').map((id) => {
        const hero = HEROES[id];
        return { ...hero, img: `${ASSETS_URL}${hero.img}` };
      });
    },
    direHeroes(): Hero[] {
      if (!this.isPublic) return [];
      const { dire_team } = this.match as PublicMatch;

      return dire_team.split(',').map((id) => {
        const hero = HEROES[id];
        return { ...hero, img: `${ASSETS_URL}${hero.img}` };
      });
    },
    duration(): string {
      return getDuration(this.match.duration);
    },
    ended() {
      return getRelativeTime(this.match.start_time);
    },
    endedDate() {
      const dtf = new Intl.DateTimeFormat('ru', {
        dateStyle: 'long',
      });

      return dtf.format(this.match.start_time * 1000);
    },
    teamName(): string {
      if (!this.team) return '';
      return this.team.name;
    },
    teamLogo(): string {
      if (!this.team) return '';
      return this.team.logo_url;
    },
    teamId(): number {
      if (!this.team) return 0;
      return this.team.team_id;
    },
    opposingTeamName(): string {
      if (this.isPublic) return '';
      return (this.match as TeamMatch).opposing_team_name;
    },
    opposingTeamLogo(): string {
      if (this.isPublic) return '';
      return (this.match as TeamMatch).opposing_team_logo;
    },
    opposingTeamId(): number {
      if (this.isPublic) return 0;
      return (this.match as TeamMatch).opposing_team_id;
    },
    teams() {
      if (this.isPublic || !this.team) return [];

      const {
        opposing_team_id,
        opposing_team_logo,
        opposing_team_name,
        radiant,
      } = this.match as TeamMatch;
      const { team_id, logo_url, name } = this.team;
      const teams = [];

      const team = { name, logo: logo_url, id: team_id };
      const opposingTeam = {
        name: opposing_team_name,
        logo: opposing_team_logo,
        id: opposing_team_id,
      };

      if (radiant) {
        teams[0] = team;
        teams[1] = opposingTeam;
      } else {
        teams[0] = opposingTeam;
        teams[1] = team;
      }

      return teams;
    },
    teamsHeroes(): { id: string; heroes: Hero[] }[] {
      return [
        { id: 'radiant', heroes: this.radiantHeroes },
        { id: 'dire', heroes: this.direHeroes },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.table-row {
  grid-template-columns:
    to-rem(175) to-rem(130)
    repeat(2, to-rem(70));

  @media screen and (min-width: to-rem(600)) {
    grid-template-columns:
      to-rem(340) to-rem(200)
      repeat(2, to-rem(220));
  }

  &--public {
    grid-template-columns:
      to-rem(120) to-rem(130)
      repeat(2, to-rem(70));

    @media screen and (min-width: to-rem(600)) {
      grid-template-columns:
        to-rem(260) to-rem(200)
        to-rem(268) to-rem(248);
    }
  }
}

.table-col {
  flex-direction: column;
  align-items: flex-start;

  &__link {
    font-weight: 600;
    font-size: to-rem(14);
    line-height: to-rem(17);
    color: $color-lime;
    text-decoration: none;

    @media screen and (min-width: to-rem(600)) {
      font-weight: 500;
      font-size: to-rem(24);
      line-height: to-rem(29);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    font-size: to-rem(12);
    line-height: to-rem(15);

    @media screen and (min-width: to-rem(600)) {
      flex-direction: row;
      align-items: center;
      font-size: to-rem(16);
      line-height: to-rem(19);
    }
  }

  &__info-separator {
    display: none;

    @media screen and (min-width: to-rem(600)) {
      display: inline-block;
    }
  }

  &__ended {
    font-size: to-rem(12);
  }

  &__rank {
    font-size: to-rem(12);
    line-height: to-rem(15);
  }

  &__team {
    display: flex;
    align-items: center;
    gap: to-rem(10);
    text-decoration: none;
  }

  &__team-logo {
    max-width: to-rem(40);
    max-height: to-rem(40);
  }

  &__team-name {
    color: $color-lime;
    display: none;

    @media screen and (min-width: to-rem(600)) {
      display: inline-block;
    }
  }
}
</style>
