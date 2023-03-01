import { IXuser } from 'app/shared/model/studyboard/xuser.model';

export interface IXgroup {
  id?: number;
  name?: string;
  users?: IXuser[] | null;
}

export const defaultValue: Readonly<IXgroup> = {};
