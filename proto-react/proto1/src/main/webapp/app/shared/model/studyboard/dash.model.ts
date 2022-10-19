import { IProject } from 'app/shared/model/studyboard/project.model';
import { IXuser } from 'app/shared/model/studyboard/xuser.model';

export interface IDash {
  id?: number;
  name?: string;
  description?: string;
  projects?: IProject[] | null;
  user?: IXuser | null;
}

export const defaultValue: Readonly<IDash> = {};
