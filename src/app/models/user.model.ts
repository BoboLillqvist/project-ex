export class User {
    _id: string;
    username: string;
    password: string;
    role: string;
    roleId: string;

    constructor(username, password, role, roleId) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.roleId = roleId;
    }
}
