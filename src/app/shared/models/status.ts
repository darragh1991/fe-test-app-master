import { DbData } from './dbData';
export class Status extends DbData{
  public id?: number;
  public tag?: string;
  public description?: string;
}
