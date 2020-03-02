import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../../../model/Client';
import {ClientsService} from '../../../../services/clients.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {CreateClientDialogComponent} from '../create-client/create-client-dialog.component';
import {PageNameService} from '../../../../services/page-name.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  readonly pageName = 'Clientes';
  displayedColumns: string[] = ['id', 'name', 'email'];
  items: Observable<Client[]>;
  tableSource = new MatTableDataSource();

  @Input() onItemClick: (client: Client) => void;
  @Input() withAddButton = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: ClientsService,
    public dialog: MatDialog,
    private pageNameService: PageNameService
  ) {
  }

  ngOnInit() {
    this.pageNameService.setPage(this.pageName);
    this.tableSource.sort = this.sort;
    this.items = this.dataService.list();
    this.items.subscribe((snapshot) => {
      console.log(JSON.stringify(snapshot));

      this.tableSource.data = snapshot as Client[];
    });

  }

  handleItemClick(client: Client) {
    if (this.onItemClick != null) {
      this.onItemClick(client);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '300px',
      height: '300px'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }

}
