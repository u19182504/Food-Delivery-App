import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Eatery } from '../shared/eatery';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab1Page implements OnInit {
  constructor(private storageService : StorageService, private cartService: CartService) {}
  eateries: Eatery[] = [];
  
  ngOnInit(): void{
    // this.storageService.eateries$.subscribe(eateries => {this.eateries = eateries});
    // this.storageService.getPlaces().subscribe((eateries: any) => {this.eateries = eateries});
    this.storageService.getPlaces().subscribe((eateries: any[]) => {
      this.eateries = eateries.map(eatery => Object.assign(new Eatery(), eatery));
    });
  }

  addToCart(eatery: Eatery){
    this.cartService.addToCart(eatery);
  }
}
