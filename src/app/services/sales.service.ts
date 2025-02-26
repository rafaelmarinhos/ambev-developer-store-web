import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  create(pedido: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, pedido);
  }

  update(id: number, pedido: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/${id}`, pedido);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}