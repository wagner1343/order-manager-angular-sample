import {Model} from './Model';
import {Client} from './Client';
import {OrderProduct} from './OrderProduct';


export interface Order extends Model {
  products: OrderProduct[];
  client: Client;
  value: number;
  discount: number;
  totalValue: number;
}
