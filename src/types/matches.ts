import { GAME_MODE, LOBBY_TYPE } from '@/utils/constants';

export type Faction = 'dire' | 'radiant';
export type Skill = 'Normal' | 'High' | 'VeryHigh';
export type GameModeId = keyof typeof GAME_MODE;
export type LobbyTypeId = keyof typeof LOBBY_TYPE;

export interface PermanentBuff {
  permanent_buff: number;
  stack_count: number;
  grant_time: number;
}

export interface Player {
  account_id: number | null;
  hero_id: number;
  name: string | null;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  last_hits: number;
  denies: number;
  net_worth: number;
  gold_per_min: number;
  xp_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  isRadiant: boolean;
  permanent_buffs: PermanentBuff[];
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  backpack_0: number;
  backpack_1: number;
  backpack_2: number;
  item_neutral: number;
  rank_tier: number | null;
  player_slot: number;
}

export interface MatchDetails {
  start_time: number;
  replay_url: string;
  dire_score: number;
  radiant_score: number;
  duration: number;
  match_id: number;
  region: number;
  skill: Skill | null;
  radiant_win: boolean;
  game_mode: GameModeId;
  lobby_type: LobbyTypeId;
  players: Player[];
}

export interface TeamMatch {
  match_id: number;
  radiant_win: boolean;
  radiant: boolean;
  duration: number;
  start_time: number;
  leagueid: number;
  league_name: string;
  cluster: number;
  opposing_team_id: number;
  opposing_team_name: string;
  opposing_team_logo: string;
}

export interface PublicMatch {
  match_id: number;
  match_seq_num: number;
  radiant_win: boolean;
  start_time: number;
  duration: number;
  radiant_team: string;
  dire_team: string;
}
