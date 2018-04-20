export class Person {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNbr: string;

    constructor(firstName, lastName, email, phoneNbr){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNbr = phoneNbr;
    }
}
