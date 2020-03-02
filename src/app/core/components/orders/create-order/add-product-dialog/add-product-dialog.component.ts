import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {

  amount = 1;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
