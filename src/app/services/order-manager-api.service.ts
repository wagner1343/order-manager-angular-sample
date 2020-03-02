import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class OrderManagerApiService {
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  readonly hostAddress = 'http://localhost:57763/api/';
  readonly endpointAddress;

  constructor(
    private http: HttpClient, public route: string) {
    this.endpointAddress = `${this.hostAddress}${this.route}`;
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.endpointAddress, this.httpOptions);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpointAddress}/${id}`, this.httpOptions);
  }

  post(data, noHeaders = false): Observable<any> {
    return this.http.post<any>(this.endpointAddress, data, noHeaders ? undefined : this.httpOptions);
  }

}
