import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab11';

  products: any[] = []
  sortedProducts: any[] = [];
  sortDirection: { [key: string]: string } = {};

  public ngOnInit(){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
              this.products = json;
              this.sortedProducts = [...this.products];
            });
  }
  
  public sortProducts(parameter: string) {
    this.sortDirection[parameter] = this.sortDirection[parameter] === 'asc' ? 'desc' : 'asc';

    this.sortedProducts.sort((a, b) => {
      const modifier = this.sortDirection[parameter] === 'asc' ? 1 : -1;

      switch (parameter) {
        case 'price':
          return (a.price - b.price) * modifier;
        case 'name':
          return a.title.localeCompare(b.title) * modifier;
        case 'rating':
          return (b.rating.rate - a.rating.rate) * modifier;
        default:
          return 0;
      }
    });
  }
}
