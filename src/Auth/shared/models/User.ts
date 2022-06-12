export interface User {
    email: string;
}

export class UserHelper {

    static createUser(email: string): User {
        return {email: email};
    }
}
