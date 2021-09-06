export class Restaurant {
    _id?: String;
    name: String;
    description: String;
    address: String;
    city: String;
    photo: String;

    constructor(_id: String, name: String, description: String,
                address: String, city: String, photo: String, reservations: Date[]) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.city = city;
        this.photo = photo;
    }
}