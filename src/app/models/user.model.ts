export class User {
    _id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    roleId: string;

    constructor(name, username, password, role, roleId) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.roleId = roleId;
    }
}
