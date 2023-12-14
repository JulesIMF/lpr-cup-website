export class Dialog {
    id: number;
    name: string;
    date: Date;
    status: string;
    episode: number;
    admin: boolean;

    constructor(id: number, name: string, date: Date, status: string, episode: number, admin: boolean) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.status = status;
        this.episode = episode;
        this.admin = admin;
    }
}
