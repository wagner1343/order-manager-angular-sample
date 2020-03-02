import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../model/Order';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {OrdersService} from '../../../../services/orders.service';
import {PageNameService} from '../../../../services/page-name.service';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  readonly pageName = 'Pedidos';
  displayedColumns: string[] = ['id', 'client.name', 'value', 'discount', 'totalValue', 'createdAt'];
  tableSource = new MatTableDataSource();
  items: Observable<Order[]>;

  @Input() onItemClick: (item: Order) => void;
  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'BRL',
  });
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: OrdersService,
    public dialog: MatDialog,
    private pageNameService: PageNameService
  ) {
  }

  format(price: number): string {
    return this.formatter.format(price);
  }

  ngOnInit() {
    this.pageNameService.setPage(this.pageName);
    this.tableSource.sort = this.sort;
    this.items = this.dataService.list();
    this.items.subscribe((snapshot) => {
      this.tableSource.data = snapshot as Order[];
    });
  }

  handleItemClick(order: Order) {
    if (this.onItemClick != null) {
      this.onItemClick(order);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }
}
