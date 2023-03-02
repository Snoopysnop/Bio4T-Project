import dayjs from 'dayjs';

export interface IBDataref {
  id?: number;
  reflist?: string;
  date?: string;
}

export const defaultValue: Readonly<IBDataref> = {};
