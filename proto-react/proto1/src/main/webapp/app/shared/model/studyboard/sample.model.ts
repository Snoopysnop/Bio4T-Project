import { ICondition } from 'app/shared/model/studyboard/condition.model';
import { IProject } from 'app/shared/model/studyboard/project.model';

export interface ISample {
  id?: number;
  name?: string;
  description?: string;
  developmentStage?: string;
  species?: string;
  organ?: string;
  tissues?: string;
  conditions?: ICondition[] | null;
  projects?: IProject[] | null;
}

export const defaultValue: Readonly<ISample> = {};
