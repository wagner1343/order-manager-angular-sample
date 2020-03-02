import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../../model/Product';
import {MatSort} from '@angular/material/sort';
import {Client} from '../../../model/Client';
import {OrdersService} from '../../../../services/orders.service';
import {MatDialog} from '@angular/material/dialog';
import {AddProductDialogComponent} from './add-product-dialog/add-product-dialog.component';
import {OrderProduct} from '../../../model/OrderProduct';
import {EditDiscountDialogComponent} from './edit-discount-dialog/edit-discount-dialog.component';
import {LoadingDialogComponent} from '../../dialogs/loading-dialog/loading-dialog.component';
import {PageNameService} from '../../../../services/page-name.service';
import {MatSnackBar} from '@angular/material/snack-bar';


class OrderRequest {
  client: Client;
  discount: number;
  orderProducts: OrderProduct[];

  constructor(
    products: OrderProduct[],
    client: Client,
    discount: number
  ) {
    this.orderProducts = products;
    this.client = client;
    this.discount = discount;
  }

  get totalValue(): number {
    return Math.max(this.value - this.discount, 0);
  };

  get value(): number {
    return this.orderProducts?.reduce<number>((prev, next) => prev + (next.product.price * next.amount), 0);
  };

  copyWith(
    {products, client, discount}
      : { products?: OrderProduct[], client?: Client, discount?: number }): OrderRequest {
    return new OrderRequest(
      products ?? this.orderProducts,
      client ?? this.client,
      discount ?? this.discount
    );
  }

}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  readonly pageName = 'Realizar pedidos';
  order = new BehaviorSubject<OrderRequest>(new OrderRequest([], null, 0));
  displayedColumns: string[] = ['id', 'description', 'price', 'amount', 'totalPrice',];
  tableSource: MatTableDataSource<OrderProduct>;

  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'BRL',
  });

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private orderService: OrdersService,
    public dialog: MatDialog,
    public pageNameService: PageNameService,
    private _snackBar: MatSnackBar
  ) {
  }

  format(price: number): string {
    return this.formatter.format(price);
  }

  ngOnInit(): void {
    this.pageNameService.setPage(this.pageName);
    this.tableSource = new MatTableDataSource(this.order.value.orderProducts);
    this.order.subscribe((o) => this.tableSource.data = o.orderProducts);
    this.tableSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }

  setClient(client: Client) {
    this.order.next(this.order.value.copyWith({client: client}));
  }


  editDiscount() {
    const dialogRef = this.dialog.open(EditDiscountDialogComponent, {
      width: '400px',
      data: this.order.value.discount
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != null && result > 0) {
        this.order.next(this.order.value.copyWith({
            discount: result
          })
        );
      }
    });
  }

  addProduct(product: Product) {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result != null && result > 0) {
        this.order.next(this.order.value.copyWith({
            products: [...this.order.value.orderProducts, {
              product: product, amount: result
            }]
          })
        );
      }
    });

  }

  removeProduct(product: OrderProduct) {
    console.log(product);
    this.order.next(this.order.value.copyWith({products: [...this.order.value.orderProducts.filter((p) => p != product)]}));
  }

  showSnackMessage(message: string) {

    this._snackBar.open(message, 'ok', {
      duration: 2000,
    });
  }

  createOrder() {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      data: 'Cadastrando pedido'
    });

    try {
      this.orderService.create(this.order.value).subscribe((result) => {
          console.log(result);
          this.cancelOrder();
          dialogRef.close();
          this.showSnackMessage('Pedido cadastrado com sucesso!');
        },
        (error) => {
          this.cancelOrder();
          dialogRef.close();
          this.showSnackMessage('Erro ao cadastrar pedido: ' + error.toString());
        }
      );
    } catch (e) {

      this.cancelOrder();
      dialogRef.close();
      this.showSnackMessage('Erro ao cadastrar pedido: ' + e.toString());
    }
  }

  cancelOrder() {
    this.order.next(new OrderRequest([], null, 0));
  }

}
