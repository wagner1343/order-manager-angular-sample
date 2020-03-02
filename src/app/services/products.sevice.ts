import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../core/model/Product';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends DataService <Product> {
  constructor(
    private client: HttpClient
  ) {
    super(client, 'products');
  }


  create(obj): Observable<any> {
    var formData = new FormData();
    formData.append('description', obj.description);
    formData.append('price', obj.price);
    formData.append('image', obj.image);

    var observableResult = this.api.post(formData, true).pipe(share());
    observableResult.subscribe((data) => this.fetchData());
    return observableResult;
  }

}
