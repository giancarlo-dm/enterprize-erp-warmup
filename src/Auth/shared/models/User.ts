export interface User {
    id: number;
    email: string;
    company: string;

    password: string|undefined;
}

export class UserHelper {

    static #idSequence: number = 1;

    static createUser(email: string, company: string, password?: string): User {
        return {
            id: UserHelper.#idSequence++,
            email: email,
            company: company,
            password: password
        };
    }
}
