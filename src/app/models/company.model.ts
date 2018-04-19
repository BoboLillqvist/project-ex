export class Company {
    ///TODO:: Uppdatera
    _id: string;
    name: string;
    description: string;

    constructor(id: string, name, description){
        this._id = id;
        this.name = name;
        this.description = description;
    }
}
