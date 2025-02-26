import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesListComponent } from "./components/sales-list/sales-list.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SalesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ambev-developer-store-web';
}
