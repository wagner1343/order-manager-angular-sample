import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ClientsService} from '../../../../services/clients.service';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.css']
})
export class CreateClientDialogComponent {
  clientData = {
    name: '',
    email: ''
  };

  isRegistering = new BehaviorSubject<boolean>(false);

  constructor(
    private dataService: ClientsService,
    public dialogRef: MatDialogRef<CreateClientDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegisterClick(): void {
    this.isRegistering.next(true);
    this.dataService.create(this.clientData).subscribe((response) => {
        this.isRegistering.next(false);
        this.dialogRef.close();
        this._snackBar.open('Cliente cadastrado com sucesso!', 'ok', {
          duration: 2000,
        });
        console.log(response);
      },
      (error) => {
        this.isRegistering.next(false);
        this._snackBar.open(error.error.Message, 'ok', {
          duration: 2000,
        });
      }
    );
  }

}
