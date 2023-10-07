export type Attacker = {
  alliance_id?: number;
  corporation_id: number;
  damage_done: number;
  final_blow: boolean;
  ship_type_id: number;
  security_status?: number;
  weapon_type_id?: number;
}

type Item = {
  flag: number;
  item_type_id: number;
  quantity_destroyed?: number;
  quantity_dropped?: number;
}

export type Victim = {
  alliance_id?: number;
  character_id: number;
  corporation_id: number;
  damage_take: number;
  items: Item[];
  ship_type_id: number;
}

export type NameRef = {
  id: number;
  category: string;
  name: string;
}

export type KillMail = {
  attackers: Attacker[];
  killmail_id: number;
  killmail_time: string;
  names: Record<number, NameRef>;
  solar_system_id: number;
  victim: Victim;

  reported: Date;
  seen: boolean;
}
