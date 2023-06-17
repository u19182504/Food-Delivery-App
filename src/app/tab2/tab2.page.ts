import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StorageService } from '../services/storage.service';
import { Observable, Subscribable, map } from 'rxjs';
import { Eatery } from '../shared/eatery';
import { CommonModule } from '@angular/common';
import { IonSearchbar } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})
export class Tab2Page implements OnInit{
  // @ViewChild('search', { static: false }) searchbar: IonSearchbar;

  eateries!: Observable<any[]>;
  searchTerm: string = '';
  
  constructor(private storageServices: StorageService, private cartService: CartService) {}

  ngOnInit(): void {
    this.eateries = this.storageServices.getPlaces();
  
  }


  performSearch(event: any){
    const searchTerm: string = event.target.value.toLowerCase();
    this.eateries = this.storageServices.search(searchTerm);
  }

  addToCart(eatery: Eatery){
    this.cartService.addToCart(eatery);
  }

  removeFromCart(eatery: Eatery){
    this.cartService.removeFromCart(eatery);
  }
  
}
