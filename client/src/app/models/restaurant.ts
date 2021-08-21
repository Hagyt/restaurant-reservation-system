export class Restaurant {
    name: String;
    description: String;
    address: String;
    city: String;
    photo: String;

    constructor(name: String, description: String,
                address: String, city: String, photo: String) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.city = city;
        this.photo = photo;
    }
}