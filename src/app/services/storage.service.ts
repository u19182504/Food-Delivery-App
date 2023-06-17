import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Eatery } from '../shared/eatery';
import { Ieatery } from '../shared/ieatery';

@Injectable({
    providedIn: 'root'
})

export class StorageService{
    get(arg0: string) {
        throw new Error('Method not implemented.');
    }
    constructor(){
        if(!localStorage.getItem('eateries')){
            let eateries = [{
                "id": 1,
                "name": "Kung Fu Kitchen",
                "dish_type": "Asian",
                "rating": 4.2,
                "time": 2,
                "distance": 0.42,
                "valueP": 65,
                "image": "../assets/kung-fu-kitchen.webp",
            },
            {
                "id": 2,
                "name": "Kotafontein",
                "dish_type": "Kasi-style",
                "rating": 4.6,
                "time": 6,
                "distance": 2.82,
                "valueP": 45,
                "image": "../assets/kota.jpg",
            },
            {
                "id": 3,
                "name": "Uncle Faouzi",
                "dish_type": "Middle-eastern, French & South African cuisine",
                "rating": 4.7,
                "time": 1.5,
                "distance": 0.15,
                "valueP": 75,
                "image": "assets/foodImage.webp",
            },
            {
                "id": 4,
                "name": "Bravo's Pizza",
                "dish_type": "Italian Pizza",
                "rating": 4.0,
                "time": 2,
                "distance": 1.5,
                "valueP": 100,
                "image": "assets/bravos.jpg",
            }
        ]
        localStorage.setItem('eateries', JSON.stringify(eateries))
        }
    }

    //Method to call all the restaurant names
    getPlaces(): Observable<any[]>{
        let eateries:any[] = []
        if(localStorage.getItem('eateries')){
            eateries = JSON.parse(localStorage.getItem('eateries')!)
        }
        return of(eateries)
    }

    //Method to search for restuarant by searching its name, dish_type, rating or distance.
    search(term: string): Observable<any[]> {
        const eateries = JSON.parse(localStorage.getItem('eateries')!);
        const filteredEateries = eateries.filter((eatery: any) =>
          eatery.name.toLowerCase().includes(term.toLowerCase()) ||
          eatery.dish_type.toLowerCase().includes(term.toLowerCase()) ||
          eatery.rating.toString().includes(term.toLowerCase()) ||
          eatery.distance.toString().includes(term.toLowerCase())
        );
        return of(filteredEateries);
      }
    
}