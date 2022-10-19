export interface Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
}

export interface MaxTeamValues {
  wins: number;
  losses: number;
  rating: number;
}
