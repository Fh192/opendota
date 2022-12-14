export type ButtonColor = 'white' | 'violet' | 'black';
export type ButtonSize = 'sm' | 'md';
export type InputValidationRules = (e: string) => string | boolean;

export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  move_speed: number;
  turn_rate?: any;
  cm_enabled: boolean;
  legs: number;
}

export interface Item {
  hint?: string[];
  id: number;
  img: string;
  dname?: string;
  qual?: string;
  cost: number | null;
  notes: string;
  attrib: any[];
  mc: boolean | number;
  cd: number | boolean;
  lore: string;
  components?: any;
  created: boolean;
  charges?: boolean | number;
  tier?: number;
  desc?: string;
}
