import dayjs from 'dayjs';
import { IComparison } from 'app/shared/model/studyboard/comparison.model';

export interface IGenolist {
  id?: number;
  title?: string;
  memberCount?: number | null;
  creationDate?: string | null;
  comparison?: IComparison | null;
}

export const defaultValue: Readonly<IGenolist> = {};
