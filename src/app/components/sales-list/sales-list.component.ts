import { Component } from '@angular/core';
import { Sale } from '../../models/sale';
import { SalesService } from '../../services/sales.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SalesCreateComponent } from '../sales-create/sales-create.component';

@Component({
  standalone: true,
  selector: 'app-sales-list',
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatIconModule, 
    MatDialogModule
  ],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent {

  // initial definitions
  sales: Sale[] = [];
  displayedColumns: string[] = ['id', 'customer', 'branch', 'actions'];

  constructor(
    private saleService: SalesService, 
    private dialog: MatDialog) {}

  // load sales
  ngOnInit(): void {
    this.saleService.getAll().subscribe((data) => {
      this.sales = data;
    });
  }

  // show modal to create new sale
  showCreateSaleModal() {
    const dialogRef = this.dialog.open(SalesCreateComponent, {
      panelClass: 'custom-dialog',
      width: '80vw',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Sale created:', result);        
      }
    });
  }

  // show modal to edit exsting sale with data
  editSale(sale: Sale) {
    const dialogRef = this.dialog.open(SalesCreateComponent, { 
      panelClass: 'custom-dialog',
      width: '80vw',
      maxHeight: '90vh',
      data: sale
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.update(result);
        console.log('Sale updated:', result);        
      }
    });
  }

  // method to cancel a sale
  cancelSale(id: number) {
    this.saleService.cancel(id);
  }
}