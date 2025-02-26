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
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatIconModule, MatDialogModule],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent {
  sales: Sale[] = [];

  constructor(private saleService: SalesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.saleService.getAll().subscribe((data) => {
      this.sales = data;
    });
  }

  showCreateSaleModal() {
    const dialogRef = this.dialog.open(SalesCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Sale created:', result);        
      }
    });
  }
}