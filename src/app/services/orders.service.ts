import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Product } from '../core/model/Product';
import {DataService} from './data.service';
import {OrderManagerApiService} from './order-manager-api.service';
import {Client} from '../core/model/Client';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';
import { Order } from '../core/model/Order';

@Injectable()
export class OrdersSevice extends DataService <Order>{
  constructor(
    private client: HttpClient
  ) {
    super(client, 'orders');
  }
}
