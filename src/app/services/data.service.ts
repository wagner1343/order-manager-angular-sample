import {BehaviorSubject, Observable} from 'rxjs';
import {OrderManagerApiService} from './order-manager-api.service';
import {Product} from '../core/model/Product';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';

export class DataService<T> {
  dataSubject = new BehaviorSubject<Product[]>([]);
  protected api: OrderManagerApiService;

  constructor(
    private http: HttpClient,
    public route
  ) {
    this.api = new OrderManagerApiService(http, this.route);
  }

  create(obj): Observable<any> {
    var observableResult = this.api.post(obj).pipe(share());
    observableResult.subscribe((data) => this.fetchData());
    return observableResult;
  }

  get(id: number): Observable<any> {
    return this.api.getById(id);
  }

  list(): Observable<any[]> {
    this.fetchData();
    return this.dataSubject.asObservable();
  }

  protected fetchData() {
    this.api.get().subscribe((data) => this.dataSubject.next(data));
  }
}

