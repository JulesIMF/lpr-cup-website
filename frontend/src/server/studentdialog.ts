export class StudentDialog {
    id: number;
    name: string;
    date: Date;
    status: string;

    constructor(id: number, name: string, date: Date, status: string) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.status = status;
    }
}
