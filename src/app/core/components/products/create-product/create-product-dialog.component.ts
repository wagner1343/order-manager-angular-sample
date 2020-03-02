import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductsService} from '../../../../services/products.sevice';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product-dialog.component.html',
    styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent {

    productData = {
        description: '',
        price: 0.0,
        image: null
    };

    filename = new BehaviorSubject<string>(undefined);

    isRegistering = new BehaviorSubject<boolean>(false);

    constructor(
        private dataService: ProductsService,
        public dialogRef: MatDialogRef<CreateProductDialogComponent>,
        private _snackBar: MatSnackBar
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    fileChanged(event) {
        this.productData.image = event.target.files[0];
        this.filename.next(event.target.files[0].name);
    }

    onRegisterClick(): void {
        this.isRegistering.next(true);
        this.dataService.create(this.productData).subscribe((response) => {
                this.isRegistering.next(false);
                this.dialogRef.close();
                this._snackBar.open('Produto cadastrado com sucesso!', 'ok', {
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
