import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {ProductsService} from '../../../../services/products.sevice';
import {Product} from '../../../model/Product';
import {CreateProductDialogComponent} from '../create-product/create-product-dialog.component';
import {PageNameService} from '../../../../services/page-name.service';
import {ImageDialogComponent} from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  readonly pageName = 'Produtos';
  displayedColumns: string[] = ['id', 'description', 'price', 'createdAt', 'image'];
  tableSource = new MatTableDataSource();
  items: Observable<Product[]>;

  @Input() onItemClick: (product: Product) => void;

  @Input() withAddButton? = true;
  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'BRL',
  });
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: ProductsService,
    public dialog: MatDialog,
    private pageNameService: PageNameService
  ) {
  }

  format(price: number): string {
    return this.formatter.format(price);
  }

  openImage(url: string) {
    this.dialog.open(ImageDialogComponent, {
      data: url
    });

  }

  ngOnInit() {
    this.pageNameService.setPage(this.pageName);
    this.tableSource.sort = this.sort;
    this.items = this.dataService.list();
    this.items.subscribe((snapshot) => {
      this.tableSource.data = snapshot;
    });
  }

  handleItemClick(product: Product) {
    if (this.onItemClick != null) {
      this.onItemClick(product);
    }
  }

  openDialog(): void {
    this.dialog.open(CreateProductDialogComponent, {
      width: '300px',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }

}
