import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {Order} from '../core/model/Order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService extends DataService <Order> {
  constructor(
    private client: HttpClient
  ) {
    super(client, 'orders');
  }


  create(obj): Observable<any> {
    try {
      var orderProductsRequestData = obj.orderProducts.map((op) => {
        return {productId: op.product.id, amount: op.amount};
      });
      var orderRequestData = {products: orderProductsRequestData, clientId: obj.client.id, discount: obj.discount};
      var observableResult = this.api.post(orderRequestData).pipe(share());
      observableResult.subscribe((data) => this.fetchData());
      return observableResult;
    } catch (ex) {

      throw throwError(ex);
    }
  }
}
