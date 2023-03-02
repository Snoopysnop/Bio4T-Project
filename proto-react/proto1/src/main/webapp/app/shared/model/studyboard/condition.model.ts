import { ISample } from 'app/shared/model/studyboard/sample.model';
import { IComparison } from 'app/shared/model/studyboard/comparison.model';

export interface ICondition {
  id?: number;
  name?: string;
  description?: string;
  samples?: ISample[] | null;
  comparisons?: IComparison[] | null;
}

export const defaultValue: Readonly<ICondition> = {};
