import { CartService } from "./cart.service";
import { Injectable } from "@angular/core";
import { Eatery } from "../shared/eatery";
import { User } from "../shared/user";
import { stringify } from "querystring";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    get(arg0: string) {
        throw new Error('Method not implemented.');
    }

    constructor(){
        if(!localStorage.getItem('users')){
            let users=[{
                "name": "Marcus Nkadimeng",
                "email": "marcus21buckets@splash.com",
                "cellNum":"0882435679",
                "displayPic": "/assets/batman.jpg"
            }]
            localStorage.setItem('users' ,JSON.stringify(users))
        }
    }

    getUsers(): Observable<any[]>{
        let users: any[] = []
        if(localStorage.getItem('users')){
            users = JSON.parse(localStorage.getItem('users')!)
        }
        return of(users)
    }
    
    saveUser(user1: User): Observable<User> {
        localStorage.setItem('currentUser', JSON.stringify(user1));
        return of(user1);
    }

}
