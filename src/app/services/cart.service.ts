import { Injectable } from "@angular/core";
import { Eatery } from "../shared/eatery";
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class CartService{
    public cartItems:  Eatery[] = [];
    private cartItemsSubject = new BehaviorSubject<Eatery[]>([]);
    public cartItems$ = this.cartItemsSubject.asObservable();
    private paidItems: Eatery[] = [];
    router: any;
    total: number = 0;

    constructor(){ }

    addToCart(item: Eatery){
        this.cartItems.push(item);
        this.cartItemsSubject.next(this.cartItems);
        console.log('Item added to cart:', item);
    }

    removeFromCart(item: Eatery){
       this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id)
       this.cartItemsSubject.next(this.cartItems);
    }

    public clearCart(): void{
        this.cartItemsSubject.next([]);
        
    }

    calculateTotal(): number{
        // return this.cartItems.reduce((total, item) => total + item.valueP, 0);
        // let OrderTotal = 0;
        // for(let x of this.cartItems){
        //     OrderTotal += x.valueP;           //The delivery is R40
        // }
        // return OrderTotal+40;
        this.total = 0;
        for (let item of this.cartItems) {
        this.total += item.valueP;
        }
        return this.total + 40;
        console.log('Total updated', this.total);
    }

    getPaidItems(): Eatery[]{
        const paidItems = this.cartItems.filter(item => item.paid);
        return paidItems;
    }

    // moveToPaidItems(items: Eatery[]) {
    //     this.cartItems = this.cartItems.filter(cartItem => !items.includes(cartItem));
    //     this.paidItems = [...this.paidItems, ...items];
    //     this.cartItemsSubject.next(this.cartItems);
    // }

    getCartItems(): Eatery[] {
        return this.cartItems;
    }
    
}