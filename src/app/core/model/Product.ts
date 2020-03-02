import {Model} from './Model';

export interface Product extends Model {
  description: string;
  price: number;
  imageURL: string;
}
