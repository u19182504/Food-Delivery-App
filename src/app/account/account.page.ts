import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Eatery } from '../shared/eatery';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from '../shared/user';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {
  public paidItems: Eatery[] = [];
  @ViewChild('helpModal') helpModal!: IonModal;
  
  constructor(private cartServices: CartService,
    private route: ActivatedRoute,
    private accountServices: AccountService,
    private router: Router,
    private modalController: ModalController) { }

  users: User[] = [];
  isEditMode: boolean = false;
  user: User = new User();

  ionViewWillEnter() {
    this.paidItems = this.cartServices.getPaidItems();
  }

  reorderItems() {
    const cartItems = this.cartServices.getCartItems().map(item => {
      return {
        ...item,
        paid: false,
      };
    });
    this.cartServices.cartItems = [...this.cartServices.cartItems, ...cartItems];
    this.router.navigate(['/tabs/tab3']);
  }

  ngOnInit(): void{
    this.paidItems = this.cartServices.getPaidItems();
    this.route.queryParams.subscribe(params => {
      if (params['paidItems']) {
        this.paidItems = JSON.parse(params['paidItems']);
      }
    });

    // this.route.queryParams.subscribe(params => {
    //   const paidItemsJson = params['paidItems'];
    //   this.paidItems = JSON.parse(paidItemsJson);

  const currentUserString = localStorage.getItem('currentUser');
  if(currentUserString !== null){
    const currentUser = JSON.parse(currentUserString);
    this.user = currentUser;
  }
  else{
    this.user = new User();
  }

    this.accountServices.getUsers().subscribe((users: any[]) => {
      this.users = users.map(user1 => Object.assign(new User(), user1) )
    });
  }

  editUser() {
    this.isEditMode = true;
  }

  saveUser() {
    this.accountServices.saveUser(this.user).subscribe((updatedUser: User) => {
      this.user = updatedUser;
      this.isEditMode = false;
    });
  }

  openModal() {
    this.helpModal.present();
  }

  closeModal() {
    this.helpModal.dismiss();
  }

}
