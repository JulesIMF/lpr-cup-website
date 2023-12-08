import { Season } from "./season";
import { StudentDialog } from "./studentdialog";

export async function getSeasons() {
    // FIXME: на самом деле спрашиваем на сервере
    var promise = new Promise<Array<Season>>((resolve, reject) => {
        resolve(new Array<Season>(
            new Season(2024, 5, 10, [10, 11]),
            new Season(2023, 4, 9, [9, 10, 11]),
            new Season(2022, 3, 8, [9])
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
    var promise = new Promise<Array<StudentDialog>>((resolve, reject) => {
        var array = new Array<StudentDialog>();

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

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setFullYear(date.getFullYear() - i);
            date.setMonth(date.getMonth() - i);
            date.setDate(date.getDate() - i);
            date.setHours(date.getHours() - 3);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new StudentDialog(id++, sampleNames[id % sampleNames.length], date, "none"));
        }

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setHours(date.getHours() - 3 * i);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new StudentDialog(id++, sampleNames[id % sampleNames.length], date, "normal"));
        }

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setHours(date.getHours() - 12);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new StudentDialog(id++, sampleNames[id % sampleNames.length], date, "deadline"));
        }

        for (var i = 0; i < count; i++) {
            var date = new Date(Date.now());
            date.setHours(date.getHours() - 15);
            date.setMinutes(date.getHours() - 20 * i);
            array.push(new StudentDialog(id++, sampleNames[id % sampleNames.length], date, "overdue"));
        }


        array.sort((a, b) => {
            var statuses = ["none", "normal", "deadline", "overdue"]
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

export function isAdmin() {
    return true;
}