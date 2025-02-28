import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '../../models/sale';
import { MatIconModule } from '@angular/material/icon';
import { SaleItem } from '../../models/sale-item';
import { MockDataService } from '../../services/mock-data.service';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; 
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-sales-create',  
  templateUrl: './sales-create.component.html',
  styleUrl: './sales-create.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatOption,
    MatSelectModule
  ],
})
export class SalesCreateComponent {

  // initial definitions
  saleForm: FormGroup;
  newItemForm: FormGroup;
  isEditing = false;
  displayedColumns: string[] = ['productId', 'quantity', 'price', 'isCanceled', 'actions'];
  dataSource = new MatTableDataSource<any>();  

  // mock data
  customers: { id: string; name: string }[] = [];
  branches: { id: string; name: string }[] = [];
  products: { id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sale | null,    
    private mockDataService: MockDataService,
    private dialog: MatDialog
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

    // load items if exists
    if (data && data.items) {
      this.loadItems(data.items);
    }
  }

  // load customers, branchs and products
  ngOnInit(): void {
    this.customers = this.mockDataService.getCustomers();
    this.branches = this.mockDataService.getBranches();
    this.products = this.mockDataService.getProducts();
  }

  // method to add a new item
  addItem() {
    if (this.newItemForm.valid) {
      this.items.push(this.fb.group(this.newItemForm.value));
      this.updateTable();
      this.newItemForm.reset({ quantity: 1, price: 0 });
    }
  }

  // method to cancel a item
  removeItem(index: number) {

    const item = this.items.at(index);
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to cancel this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          item.patchValue({ isCanceled: true });
          this.updateTable();
        }
      }
    });
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
        price: [item.price, [Validators.required, Validators.min(0.01)]],
        isCanceled: [item.isCanceled || false]
      }));
    });

    this.updateTable();
  }

  // save the entire sale
  save() {
    if (this.saleForm.valid) {            
      const sale = this.saleForm.value as Sale;
      this.dialogRef.close(sale);        
    }
  }

  // get product name by id
  getProductName(id: string): string {
    return this.products.find(b => b.id === id)?.name || 'Unkown';
  }
}