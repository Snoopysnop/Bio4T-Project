import { IProject } from 'app/shared/model/studyboard/project.model';
import { IDash } from 'app/shared/model/studyboard/dash.model';
import { IDataentity } from 'app/shared/model/studyboard/dataentity.model';
import { IXgroup } from 'app/shared/model/studyboard/xgroup.model';

export interface IXuser {
  id?: number;
  name?: string;
  projects?: IProject[] | null;
  dashes?: IDash[] | null;
  dataentities?: IDataentity[] | null;
  groups?: IXgroup[] | null;
}

export const defaultValue: Readonly<IXuser> = {};
