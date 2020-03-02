import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Order} from '../../../model/Order';

@Component({
  selector: 'app-orders-section',
  templateUrl: './orders-section.component.html',
  styleUrls: ['./orders-section.component.css']
})
export class OrdersSectionComponent implements OnInit {

  order = new BehaviorSubject(undefined);

  constructor() {
  }

  ngOnInit(): void {
  }

  onOrderClick(o: Order) {
    this.order.next(o);
  }

}
