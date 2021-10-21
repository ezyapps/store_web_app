import { Observable } from 'rxjs';


export interface ICRUDService<T, ID> {
  save(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  //update(t: T): Observable<T>;
  findOne(id: ID): Observable<T>;
  findAll(): Observable<T[]>;
  delete(id: ID): Observable<any>;
}
