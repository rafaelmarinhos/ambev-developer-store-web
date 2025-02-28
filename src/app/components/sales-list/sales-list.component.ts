import { Component } from '@angular/core';
import { Sale } from '../../models/sale';
import { SalesService } from '../../services/sales.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SalesCreateComponent } from '../sales-create/sales-create.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MockDataService } from '../../services/mock-data.service';

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
  displayedColumns: string[] = ['id', 'customer', 'branch', 'status', 'actions'];

  // mock data
  customers: { id: string; name: string }[] = [];
  branches: { id: string; name: string }[] = [];

  constructor(
    private saleService: SalesService, 
    private mockDataService: MockDataService,
    private dialog: MatDialog) {}

  // load sales on init component
  ngOnInit(): void {
    this.loadSales();
    this.customers = this.mockDataService.getCustomers();
    this.branches = this.mockDataService.getBranches();
  }

  // get sales
  loadSales() {
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
        this.saleService.create(result).subscribe(() => {
          this.loadSales();
        });
      }
    });
  }

  // show modal to edit exsting sale with data
  showEditSaleModal(sale: Sale) {
    const dialogRef = this.dialog.open(SalesCreateComponent, { 
      panelClass: 'custom-dialog',
      width: '80vw',
      maxHeight: '90vh',
      data: sale
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.update(result).subscribe(() => {
          this.loadSales();
        });        
      }
    });
  }

  // method to cancel a sale
  cancelSale(id: string) {        
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to cancel this sale?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.cancel(id).subscribe(() =>{
          this.loadSales();
        });
      }
    });    
  }

  // get customer name by id
  getCustomerName(id: string): string {
    return this.customers.find(c => c.id === id)?.name || 'Unkown';
  }
  
  // get branch name by id
  getBranchName(id: string): string {
    return this.branches.find(b => b.id === id)?.name || 'Unkown';
  }
}