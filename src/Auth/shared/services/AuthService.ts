import { User, UserHelper } from "../models";

export class AuthService {

    static async login(email: string, password: string): Promise<User> {
        return UserHelper.createUser(email);
    }

    static async logout(): Promise<void> {

    }
}
