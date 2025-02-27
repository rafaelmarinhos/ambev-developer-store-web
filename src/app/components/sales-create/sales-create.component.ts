import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../models/sale';
import { MatIconModule } from '@angular/material/icon';
import { SaleItem } from '../../models/sale-item';

@Component({
  standalone: true,
  selector: 'app-sales-create',  
  templateUrl: './sales-create.component.html',
  styleUrl: './sales-create.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],
})
export class SalesCreateComponent {

  // initial definitions
  saleForm: FormGroup;
  newItemForm: FormGroup;
  isEditing = false;
  displayedColumns: string[] = ['productId', 'quantity', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>();  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sale | null,
    private salesService: SalesService
  ) {

    this.isEditing = !!data;

    // initialize sale form
    this.saleForm = this.fb.group({
      id: [data?.id || null],
      customerId: [data?.customerId, [Validators.required]],
      branchId: [data?.branchId, [Validators.required]],
      items: this.fb.array([])
    });

    // initialize sale item form
    this.newItemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });

    // load itens if exists
    if (data && data.items) {
      this.loadItems(data.items);
    }
  }

  // method to add a new item
  addItem() {
    if (this.newItemForm.valid) {
      this.items.push(this.fb.group(this.newItemForm.value));
      this.updateTable();
      this.newItemForm.reset({ quantity: 1, price: 0 });
    }
  }

  // method to remove a existing item
  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateTable();
  }

  // method to update items table after add ou remove items
  private updateTable() {
    this.dataSource.data = this.items.value;
  }

  get items() {
    return this.saleForm.get('items') as FormArray;
  }
  
  // load added items
  private loadItems(items: SaleItem[]) {
    this.items.clear();  
    items.forEach(item => {
      this.items.push(this.fb.group({
        productId: [item.productId, Validators.required],
        quantity: [item.quantity, [Validators.required, Validators.min(1)]],
        price: [item.price, [Validators.required, Validators.min(0.01)]]
      }));
    });

    this.updateTable();
  }

  // save the entire sale
  save() {
    if (this.saleForm.valid) {
      
      // get form sale
      const sale = this.saleForm.value as Sale;

      // calculate total amount
      sale.totalAmount = this.getTotalAmount(sale);

      // call service to create a new one or update
      if (this.isEditing) {
        this.salesService.update(sale);
      } else {
        this.salesService.create(sale);
      }

      // close modal
      this.dialogRef.close();
    }
  }

  getTotalAmount(sale: Sale): number {
    sale.items = sale.items.map((item: SaleItem) => ({
      ...item,
      quantidade: Number(item.quantity),
      valorUnitario: Number(item.price)
    }));

    var totalAmount = sale.items.reduce((acc: number, item: any) => {
      const quantidade = Number(item.quantidade) || 0;
      const valorUnitario = Number(item.valorUnitario) || 0;
      return acc + (quantidade * valorUnitario);
    }, 0);

    return totalAmount;
  }
}