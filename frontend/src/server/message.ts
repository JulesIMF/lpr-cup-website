export class Message {
    date: Date;
    constructor(date: Date) {
        this.date = date;
    }
}

export class RealMessage extends Message {
    text: string;
    mine: boolean;
    attachmentUrl?: string;

    constructor(text: string, date: Date, mine: boolean, attachmentUrl?: string) {
        super(date);
        this.text = text;
        this.mine = mine;
        this.attachmentUrl = attachmentUrl;
    }
}

export class DateMessage extends Message {
}
