import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './core/components/products/products-list/products-list.component';
import { ClientsListComponent } from './core/components/clients/clients-list/clients-list.component';

import { CreateOrderComponent } from './core/components/orders/create-order/create-order.component';
import { CreateProductDialogComponent } from './core/components/products/create-product/create-product-dialog.component';
import { CreateClientDialogComponent } from './core/components/clients/create-client/create-client-dialog.component';
import {OrdersSectionComponent} from './core/components/orders/orders-section/orders-section.component';


const routes: Routes = [


  {
    path: 'orders',
    component: OrdersSectionComponent,
  },


  {
    path: 'orders/create',
    component: CreateOrderComponent,
  },

  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'products/create',
    component: CreateProductDialogComponent,
  },

  {
    path: 'clients',
    component: ClientsListComponent,
  },

  {
    path: 'clients/create',
    component: CreateClientDialogComponent,
  },

  {
    path: '**',
    redirectTo: 'orders'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
