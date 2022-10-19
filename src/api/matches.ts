import api from '@/api';
import { MatchDetails, PublicMatch } from '@/types/matches';

export const getMatchDetails = async (id: number): Promise<MatchDetails> => {
  const { data } = await api.get<MatchDetails>(`matches/${id}`);

  return data;
};

export const getPublicMatches = async (): Promise<PublicMatch[]> => {
  const { data } = await api.get<PublicMatch[]>(
    'publicMatches?mmr_ascending=1'
  );

  return data;
};
