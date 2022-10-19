import { GAME_MODE, LOBBY_TYPE, RANK } from './constants';

export const getNumberWithOrdinal = (n: number): string => {
  let j = n % 10;
  let k = n % 100;

  if (j == 1 && k != 11) return n + 'st';
  if (j == 2 && k != 12) return n + 'nd';
  if (j == 3 && k != 13) return n + 'rd';

  return n + 'th';
};

export const snakeCaseToSentenceCase = (str: string): string => {
  const normalized = str.toLocaleLowerCase().replaceAll('_', ' ');
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export const getGameMode = (id: keyof typeof GAME_MODE): string => {
  const gameMode = GAME_MODE[id].replace('game_mode_', '');
  return snakeCaseToSentenceCase(gameMode);
};

export const getLobbyType = (id: keyof typeof LOBBY_TYPE): string => {
  const lobbyType = LOBBY_TYPE[id].replace('lobby_type_', '');
  return snakeCaseToSentenceCase(lobbyType);
};

export const kFormatter = (num: number): string => {
  let formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return formatter.format(num).toLocaleLowerCase();
};

export const getRelativeTime = (seconds: number): string => {
  const now = Date.now() / 1000;
  const rtf = new Intl.RelativeTimeFormat('ru', {
    numeric: 'always',
    style: 'long',
  });

  const difference = now - seconds;
  let value: number = difference / 31449600;
  let unit: Intl.RelativeTimeFormatUnit = 'years';

  if (difference < 60) {
    unit = 'seconds';
    value = difference;
  } else if (difference < 3600) {
    unit = 'minutes';
    value = difference / 60;
  } else if (difference < 86400) {
    unit = 'hours';
    value = difference / 3600;
  } else if (difference < 2620800) {
    unit = 'days';
    value = difference / 86400;
  } else if (difference < 31449600) {
    unit = 'months';
    value = difference / 2620800;
  }

  value = -Math.floor(value);

  return rtf.format(value, unit);
};

export const getDuration = (seconds: number): string => {
  const dtf = new Intl.DateTimeFormat('ru', {
    timeZone: 'Etc/UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return dtf.format(seconds * 1000).replace(/^00:/, '');
};

export const getRank = (rankTire?: number | null): string => {
  if (!rankTire) return 'Unknown';
  const [rank, stars] = rankTire.toString();

  return `${RANK[rank]}${+stars ? ` [${stars}]` : ''}`;
};
