import { IUser } from "./iuser";

type nullAllow= string | null;
export class User implements IUser{
    subscribe(arg0: (updatedUser: any) => void) {
      throw new Error('Method not implemented.');
    }
    name!: string;
    email!: string;
    cellNum!: string;
    displayPic!: string;
}