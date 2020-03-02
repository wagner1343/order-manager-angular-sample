import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {PageNameService} from '../../../services/page-name.service';


interface SideNavRoute {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild('commandbarSidenav', {static: true})
  public sidenav: MatSidenav;

  public routes: SideNavRoute[];

  constructor(
    private pageNameService: PageNameService
  ) {
  }

  public ngOnInit(): void {
    this.loadNavListItems();
  }

  async loadNavListItems() {

    this.routes = [
      {
        icon: 'add_shopping_cart',
        title: 'Realizar pedidos',
        route: 'orders/create'
      },
      {
        icon: 'receipt',
        title: 'Pedidos',
        route: 'orders'
      },
      {
        icon: 'folder_open',
        title: 'Produtos',
        route: 'products'
      },
      {
        icon: 'face',
        title: 'Clientes',
        route: 'clients'
      },
    ];

  }

  setPage(page: string) {
    this.pageNameService.setPage(page);
  }

}
