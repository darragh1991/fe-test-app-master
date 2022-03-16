import { DbData } from './dbData';
export class Users extends DbData{
  public id?: string;
  public first_name?: string;
  public last_name?: string;
  public email?: string;
  public username?: string;
  public created_date?: string;
  public id_status?: number;
}
