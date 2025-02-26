import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

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
    MatCardModule
  ],
})
export class SalesCreateComponent {
  newSaleForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SalesCreateComponent>) {
    this.newSaleForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  create() {
    if (this.newSaleForm.valid) {
      console.log('Sale created:', this.newSaleForm.value);
      this.dialogRef.close(this.newSaleForm.value);
    }
  }
}