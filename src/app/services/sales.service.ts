import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  // private apiUrl = 'http://localhost:3000/pedidos';

  // constructor(private http: HttpClient) {}

  // getAll(): Observable<Sale[]> {
  //   return this.http.get<Sale[]>(this.apiUrl);
  // }

  // getById(id: number): Observable<Sale> {
  //   return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  // }

  // create(pedido: Sale): Observable<Sale> {
  //   return this.http.post<Sale>(this.apiUrl, pedido);
  // }

  // update(id: number, pedido: Sale): Observable<Sale> {
  //   return this.http.put<Sale>(`${this.apiUrl}/${id}`, pedido);
  // }

  // cancel(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  private sales: Sale[] = []; // Simula um banco de dados local
  private salesSubject = new BehaviorSubject<Sale[]>(this.sales);

  constructor() {}

  getAll(): Observable<Sale[]> {
    return this.salesSubject.asObservable();
  }

  create(sale: Sale) {
    sale.id = this.sales.length + 1; // Gera um ID simples
    this.sales.push(sale);
    this.salesSubject.next([...this.sales]); // Atualiza a lista
  }

  cancel(id: number) {
    this.sales = this.sales.filter(p => p.id !== id);
    this.salesSubject.next([...this.sales]); // Atualiza a lista
  }

  update(sale: Sale) {
    const index = this.sales.findIndex(p => p.id === sale.id);
    if (index !== -1) {
      this.sales[index] = sale;
      this.salesSubject.next([...this.sales]); // Atualiza a lista
    }
  }
}