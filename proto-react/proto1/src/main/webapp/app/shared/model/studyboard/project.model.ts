import dayjs from 'dayjs';
import { IComparison } from 'app/shared/model/studyboard/comparison.model';
import { ISample } from 'app/shared/model/studyboard/sample.model';
import { IXuser } from 'app/shared/model/studyboard/xuser.model';
import { IDash } from 'app/shared/model/studyboard/dash.model';

export interface IProject {
  id?: number;
  name?: string;
  description?: string;
  creationDate?: string | null;
  comparisons?: IComparison[] | null;
  samples?: ISample[] | null;
  user?: IXuser | null;
  dash?: IDash | null;
}

export const defaultValue: Readonly<IProject> = {};
