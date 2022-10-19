import { IGenolist } from 'app/shared/model/studyboard/genolist.model';
import { ICondition } from 'app/shared/model/studyboard/condition.model';
import { IProject } from 'app/shared/model/studyboard/project.model';

export interface IComparison {
  id?: number;
  title?: string;
  genolists?: IGenolist[] | null;
  conditions?: ICondition[] | null;
  project?: IProject | null;
}

export const defaultValue: Readonly<IComparison> = {};
