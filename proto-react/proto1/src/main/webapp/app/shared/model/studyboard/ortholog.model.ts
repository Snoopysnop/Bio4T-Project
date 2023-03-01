export interface IOrtholog {
  id?: number;
  name?: string;
  source?: string | null;
  aliasList?: string | null;
}

export const defaultValue: Readonly<IOrtholog> = {};
