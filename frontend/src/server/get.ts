import { Message, RealMessage } from "./message";
import { Season } from "./season";
import { Dialog } from "./dialog";
import { getUser, requestToServer } from "./server";
import { Submission } from "./submission";



// Done
export async function getSeasons() {
    var promise = requestToServer(
        "GET",
        "/api/seasons"
    ).then(v => v.json()).then(
        (v) => {
            if (!v) {
                return undefined;
            }

            var res = new Array<Season>();
            var seasons = new Set<number>();
            for (var grade of v) {
                seasons.add(grade.season)
            }

            var year = 0;

            for (var s of seasons) {
                var grades = new Array<number>();
                for (var g of v) {
                    if (g.season == s) {
                        grades.push(g.number);
                        year = g.year;
                    }
                }

                grades.sort((a, b) => (a - b));
                console.log(grades);

                res.push(new Season(
                    year,
                    s,
                    grades
                ))
            }

            return res;
        }
    )

    return promise;
}

// Done
export async function getEpisodesCount(season: number, grade: number) {
    var promise = requestToServer(
        "GET",
        `/api/episodesCount?season=${season}&grade=${grade}`
    ).then(v => v.json()).then((v) => {
        return v;
    })

    return promise;
}

function toDate(x: Array<number>) {
    if (!x)
        return new Date();

    var date = new Date();
    date.setFullYear(x[0]);
    date.setMonth(x[1] - 1);
    date.setDate(x[2]);
    date.setHours(x[3]);
    date.setMinutes(x[4]);
    date.setSeconds(x[5]);

    return date;
}

// Done
export async function getStudentDialogs(season: number, grade: number, episode: number) {
    var promise = requestToServer(
        "GET",
        `/api/studentDialogs?season=${season}&grade=${grade}&episode=${episode}`
    ).then(v => v.json()).then((v) => {
        console.log(`/api/studentDialogs?season=${season}&grade=${grade}&episode=${episode}`);
        console.log(v);
        var res = (v as Array<any>).map((x) => {
            return new Dialog(
                x.id,
                `${x.student.name} ${x.student.surname}`,
                toDate(x.lastMessage),
                "none",
                episode,
                false
            )
        });

        res.sort((a, b) => {
            var statuses = ["none", "normal", "deadline", "overdue", "channel"]
            var statusA = statuses.indexOf(a.status);
            var statusB = statuses.indexOf(b.status);

            // Проверять надо сначала ранние, а не поздние
            return (statusB - statusA) * 1000000000000000 +
                (a.date.valueOf() - b.date.valueOf()) *
                ((a.status == b.status && a.status == "none") ? -1 : 1);
        })

        return res;
    })

    return promise;
}

// Done
export function getNewsDialog(season: number) {
    return new Dialog(-season, `Новости ${season} Сезона`, new Date(), "none", 0, !isAdmin())
}

// Done
export async function getAdminDialog(season: number, grade: number, episode: number) {
    var promise = requestToServer(
        "GET",
        `/api/adminDialog?season=${season}&grade=${grade}&episode=${episode}`
    ).then(v => v.json()).then((v) => {
        console.log(v);
        return new Dialog(
            v.id,
            `Беседа с Жюри по ${episode} Эпизоду ${season} Сезона`,
            v.lastMessage,
            "none",
            episode,
            true);
    })

    return promise;
}

export function isAdmin() {
    return getUser().isAdmin;
}

function toMessage(x: any) {
    var date = new Date();
    date.setFullYear(x.time[0]);
    date.setMonth(x.time[1] - 1);
    date.setDate(x.time[2]);
    date.setHours(x.time[3]);
    date.setMinutes(x.time[4]);
    date.setSeconds(x.time[5]);
    var message = new RealMessage(
        x.text,
        date,
        x.fromUser.id == getUser().id
    )

    console.log(message)
    return message;
}

export async function getAllMessages(dialog: Dialog) {
    var promise = requestToServer(
        "GET",
        `/api/allMessages?dialogId=${dialog.id}`
    ).then(v => v.json()).then((v) => {
        return (v as Array<any>).map((x) => toMessage(x)).sort((a, b) => {
            return b.date.getTime() - a.date.getTime();
        });
    })

    return promise;
}

export async function getNewIncomingMessages(dialog: Dialog) {
    var promise = requestToServer(
        "GET",
        `/api/newMessages?dialogId=${dialog.id}`
    ).then(v => v.json()).then((v) => {
        console.log(v);
        return (v as Array<any>).map((x) => toMessage(x)).reverse();
    })

    return promise;
}

export async function getSubmission(id: number) {
    var promise = requestToServer(
        "GET",
        `/api/submission?submissionId=${id}`
    ).then(v => v.json()).then((v) => {
        console.log(v);
        var checked = false;
        var verdict = new Map<string, "n" | "m" | "c" | "p" | "i">();
        for (var vd of v.verdicts) {
            console.log(vd);
            console.log(vd.task);
            verdict.set(
                vd.task.name,
                vd.code.toLowerCase()
            )

            if (vd.code != "N") {
                checked = true;
            }
        }

        console.log(verdict)

        return (new Submission(
            v.id,
            `${v.student.name} ${v.student.surname}`,
            v.episode.grade.season,
            v.episode.grade.number,
            v.episode.number,
            v.number,
            checked,
            verdict
        ))
    })

    return promise;
}
