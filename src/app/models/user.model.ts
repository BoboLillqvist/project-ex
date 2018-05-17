export class User {
    _id: string
    username: string;
    password: string;
    role: string;

    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
