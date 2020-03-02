import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {NavComponent} from './components/nav/nav.component';

import {throwIfAlreadyLoaded} from './module-import-guard';

import {AngularMaterialModule} from '../shared/angular-material.module';
import {OrdersListComponent} from './components/orders/orders-list/orders-list.component';
import {CreateOrderComponent} from './components/orders/create-order/create-order.component';
import {CreateClientDialogComponent} from './components/clients/create-client/create-client-dialog.component';
import {ClientsListComponent} from './components/clients/clients-list/clients-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {CreateProductDialogComponent} from './components/products/create-product/create-product-dialog.component';
import {FormsModule} from '@angular/forms';
import {OrdersSectionComponent} from './components/orders/orders-section/orders-section.component';
import {OrderDetailComponent} from './components/orders/order-detail/order-detail.component';
import {AddProductDialogComponent} from './components/orders/create-order/add-product-dialog/add-product-dialog.component';
import {EditDiscountDialogComponent} from './components/orders/create-order/edit-discount-dialog/edit-discount-dialog.component';
import {ImageDialogComponent} from './components/products/products-list/image-dialog/image-dialog.component';
import {LoadingDialogComponent} from './components/dialogs/loading-dialog/loading-dialog.component';

const components: any[] = [
  NavigationBarComponent,
  NavComponent
];

@NgModule({
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  declarations: [...components, OrdersListComponent,
    CreateOrderComponent, CreateClientDialogComponent,
    ClientsListComponent, ProductsListComponent,
    CreateProductDialogComponent, OrdersSectionComponent,
    OrderDetailComponent, AddProductDialogComponent,
    EditDiscountDialogComponent,
    LoadingDialogComponent,
    ImageDialogComponent,],
  exports: [...components]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
