import { Message, RealMessage } from "./message";
import { Season } from "./season";
import { Dialog } from "./dialog";
import { extractNewMessages } from "./server";
import { Submission } from "./submission";

export async function getSeasons() {
    // FIXME: на самом деле спрашиваем на сервере
    var promise = new Promise<Array<Season>>((resolve, reject) => {
        resolve(new Array<Season>(
            new Season(2024, 5, [10, 11]),
            new Season(2023, 4, [9, 10, 11]),
            new Season(2022, 3, [9])
        ));
    });

    return promise;
}

export async function getEpisodesCount(season: number, grade: number) {
    var promise = new Promise<number>((resolve, reject) => {
        resolve(3);
    });

    return promise;
}

export async function getStudentDialogs(season: number, grade: number, episode: number) {
    var promise = new Promise<Array<Dialog>>((resolve, reject) => {
        var array = new Array<Dialog>();

        if (episode == 0) {
            resolve(array);
            return;
        }

        var count = (3 - episode) * 4;
        var id = 0;

        var sampleNames = [
            "Лёшка Билка",
            "Женя Гранаткина",
            "Мия",
            "Сабина Ахмедова",
            "Эрик Черкассов",
            "Маша Гранаткина",
            "Никита Всегдаправ",
            "Azamat Gimaev",
            "Тот самый Леонардо Кронекер",
        ];

        array.push(new Dialog(id++, `Канал ${grade}.s${season}.e${episode}`, new Date(), "channel", episode, false));

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setFullYear(date.getFullYear() - i);
            date.setMonth(date.getMonth() - i);
            date.setDate(date.getDate() - i);
            date.setHours(date.getHours() - 3);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new Dialog(id++, sampleNames[id % sampleNames.length], date, "none", episode, false));
        }

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setHours(date.getHours() - 3 * i);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new Dialog(id++, sampleNames[id % sampleNames.length], date, "normal", episode, false));
        }

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setHours(date.getHours() - 12);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new Dialog(id++, sampleNames[id % sampleNames.length], date, "deadline", episode, false));
        }

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setHours(date.getHours() - 15);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new Dialog(id++, sampleNames[id % sampleNames.length], date, "overdue", episode, false));
        }


        array.sort((a, b) => {
            var statuses = ["none", "normal", "deadline", "overdue", "channel"]
            var statusA = statuses.indexOf(a.status);
            var statusB = statuses.indexOf(b.status);

            // Проверять надо сначала ранние, а не поздние
            return (statusB - statusA) * 1000000000000000 +
                (a.date.valueOf() - b.date.valueOf()) *
                ((a.status == b.status && a.status == "none") ? -1 : 1);
        })

        resolve(array);
    });

    return promise;
}

export function getNewsDialog(season: number) {
    return new Dialog(-season, `Новости ${season} Сезона`, new Date(), "none", 0, !isAdmin())
}

export async function getAdminDialog(season: number, episode: number) {
    var promise = new Promise<Dialog>((resolve, reject) => {
        resolve(new Dialog(season * 10 + episode, `Беседа с Жюри по ${episode} Эпизоду ${season} Сезона`, new Date(), "none", episode, false));
    });

    return promise;
}

export function isAdmin() {
    return false;
}
var messages = new Array<Message>(
    // new DateMessage(new Date(Date.parse('18 May 2024 00:00:00'))),
    new RealMessage("Мессага с анонсом<br/>с анонсом мессага<br/>Траляляляля", new Date(Date.parse('18 May 2023 12:00:00')), isAdmin(), "/task.pdf"),
    new RealMessage("Объявление<br/><br/>Считайте вот эту штуку абсолютно упругой<br/><br/>И еще что-то важное. Лол.", new Date(Date.parse('18 May 2023 13:22:00')), isAdmin()),
    new RealMessage("<a href=\"/lprcup/submission?id=123\">Попытка #1</a>", new Date(Date.parse('18 May 2023 19:04:00')), !isAdmin(), "/submission123.pdf"),
    // new DateMessage(new Date(Date.parse('19 May 2023 00:00:00'))),
    new RealMessage("<a href=\"/lprcup/submission?id=123\">Попытка #1</a>&nbsp;проверена!<br/><br/>1. Correct (k=1)<br/>2. Part (k=0.9)<br/>3. Incorrect (k=0.8)", new Date(Date.parse('19 May 2023 03:12:00')), isAdmin()),
    // new DateMessage(new Date(Date.parse('20 May 2023 00:00:00'))),
    new RealMessage("Первый хинт!", new Date(Date.parse('20 May 2023 12:00:00')), isAdmin(), "/hint1.pdf"),
);

messages.reverse();

export async function getAllMessages(dialog: Dialog) {
    var promise = new Promise<Array<Message>>((resolve, reject) => {
        resolve(messages);
    });

    return promise;
}

var getMessagesRuns = 0;

export async function getNewIncomingMessages(dialog: Dialog) {
    var promise = new Promise<Array<Message>>((resolve, reject) => {
        if (getMessagesRuns++ == 1) {
            resolve([
                new RealMessage("Лол message 1", new Date(), false),
                new RealMessage("Лол message 2", new Date(), false)].reverse());
        } else if (getMessagesRuns == 5) {
            resolve([new RealMessage("Лол дополнительный message<br/><br/>Спонсор этого выпуска: EDYA GPT", new Date(), false),].reverse());
        }

        resolve(extractNewMessages());
    });

    return promise;
}

export async function getSubmission(id: number) {
    var promise = new Promise<Submission>((resolve, reject) => {
        var verdict = new Map<string, "n" | "m" | "c" | "p" | "i">();
        if (id == 123) {
            verdict.set("1", "c");
            verdict.set("2", "p");
            verdict.set("3", "i");
            verdict.set("4", "m");
        }

        else {
            verdict.set("1", "n");
            verdict.set("2", "n");
            verdict.set("3", "n");
            verdict.set("4", "n");
        }

        resolve(new Submission(
            id,
            "Сабина Ахмедова",
            5,
            10,
            3,
            (id == 123 ? 1 : 2),
            id == 123,
            verdict
        ))
    });

    return promise;
}
