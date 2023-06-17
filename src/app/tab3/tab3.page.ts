import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CartService } from '../services/cart.service';
import { Eatery } from '../shared/eatery';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab3Page implements OnInit {
  public cartItems$: Observable<Eatery[]> = new Observable<Eatery[]>() ;
  cartItems: Eatery[] = [];
  public total: number = 0;
  

  constructor(private cartServices: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartServices.cartItems$;
    this.cartServices.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      console.log('Cart Items Updated', this.cartItems);
    });
    
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = this.cartServices.calculateTotal();
    console.log('Total updated', this.total);
  }

  removeItem(item: Eatery){
    this.cartServices.removeFromCart(item);
    console.log('Item has been removed from cart');
  }

  clearCart() {
    this.cartServices.clearCart();
    this.cartItems$ = new Observable<Eatery[]>(observer => {
      observer.next([]);
      observer.complete();
    });
    this.total = 0;
  }

  getPaidItems(): Eatery[]{
    return this.cartServices.getPaidItems();
  }

  makePayment() {
    for (let item of this.cartItems) {
      item.paid = true;
    }
    const paidItems = this.cartServices.getPaidItems();
    this.router.navigate(['/account'], { queryParams: { paidItems: JSON.stringify(paidItems) } });

    // const paidItems = this.cartItems$.getValue().filter((item: { paid: any; }) => item.paid);
    // this.cartServices.paidItems.push(...paidItems);
    // this.cartServices.cartItems = this.cartServices.cartItems.filter(item => !item.paid);
    // this.cartServices.cartItemsSubject.next(this.cartServices.cartItems);
    
  }
  
  

}
