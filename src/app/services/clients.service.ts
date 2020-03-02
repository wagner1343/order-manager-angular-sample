import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Client} from '../core/model/Client';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends DataService<Client> {
  constructor(
    private client: HttpClient
  ) {
    super(client, 'clients');
  }
}
