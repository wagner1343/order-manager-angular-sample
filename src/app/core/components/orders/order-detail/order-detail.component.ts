import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../../model/Order';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {OrderProduct} from '../../../model/OrderProduct';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'price', 'amount', 'totalPrice'];

  tableSource: MatTableDataSource<OrderProduct>;
  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'BRL',
  });
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  private _order: Order;

  get order(): Order {
    return this._order;
  }

  @Input() set order(value: Order) {
    this._order = value;
    this.tableSource = new MatTableDataSource(this.order?.products);
    this.tableSource.sort = this.sort;
  }

  format(price: number): string {
    return this.formatter.format(price);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }
}
