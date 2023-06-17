import { Ieatery } from "./ieatery";

type nullAllow = number | string | null;

export class Eatery implements Ieatery {
    id!: number;
    name!: string;
    dish_type!: string;
    rating!: number;
    time!: number;
    distance!: number;
    image!: string;
    valueP!: number;
    paid!: boolean;
}