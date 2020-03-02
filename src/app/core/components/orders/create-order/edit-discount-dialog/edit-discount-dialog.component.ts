import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-discount-dialog',
  templateUrl: './edit-discount-dialog.component.html',
  styleUrls: ['./edit-discount-dialog.component.css']
})
export class EditDiscountDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDiscountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public discount: number
  ) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
