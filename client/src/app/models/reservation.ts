export class Reservation {
    _id?: String;
    table: Number;
    date: String;

    constructor(_id: String, table: Number, date: String) {
        this._id = _id;
        this.table = table;
        this.date = date;
    }
}