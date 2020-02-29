import { Observable } from 'rxjs';

export interface Service<T> {
  create(obj: T): Observable<T>;
  get(id: number): Observable<T>;
  list(): Observable<T[]>;
}

