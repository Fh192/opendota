import api from '@/api';
import { TeamMatch } from '@/types/matches';
import { Team } from '@/types/teams';

export const getTeams = async (page: number = 0): Promise<Team[]> => {
  const { data } = await api.get<Team[]>(`teams?page=${page}`);

  return data;
};

export const getTeam = async (id: number): Promise<Team> => {
  const { data } = await api.get<Team>(`teams/${id}`);

  return data;
};

export const getTeamMatches = async (teamId: number): Promise<TeamMatch[]> => {
  const { data } = await api.get<TeamMatch[]>(`teams/${teamId}/matches`);

  return data;
};
