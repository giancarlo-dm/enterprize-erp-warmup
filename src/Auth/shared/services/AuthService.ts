import { User, UserHelper } from "../models";

export class AuthService {

    static readonly #users = [
        UserHelper.createUser("giancarlo.dallemole1995@gmail.com", "enterprize", btoa("123456")),
        UserHelper.createUser("tali.zorah@normandy.com", "normandy", btoa("123456")),
        UserHelper.createUser("claire.redfield@umbrella.com", "umbrella", btoa("123456")),
    ];

    static login(email: string, password: string, company: string): Promise<User> {
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               const user: User|undefined = AuthService.#users
                   .find(value => value.email === email && value.company === company);

               if (user == null || user.password !== btoa(password)) {
                   reject(new Error("401 - Unauthorized"));
               }
               else {
                   resolve({...user, password: undefined});
               }
           },500) ;
        });
    }

    static async logout(): Promise<void> {

    }
}
