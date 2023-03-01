import { IXuser } from 'app/shared/model/studyboard/xuser.model';

export interface IDataentity {
  id?: number;
  name?: string;
  dtype?: string;
  user?: IXuser | null;
}

export const defaultValue: Readonly<IDataentity> = {};
