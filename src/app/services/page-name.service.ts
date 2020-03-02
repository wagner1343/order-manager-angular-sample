import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageNameService {
  page = new BehaviorSubject<String>('');

  constructor() {
  }

  setPage(p: string) {
    this.page.next(p);
  }
}
