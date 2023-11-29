export class Season {    
    grades: Array<Number>;
    year: number;
    userGrade: number;
    seasonNumber: number;

    constructor (year: number, seasonNumber: number, userGrade: number, grades: Array<number>) {
        this.year = year;
        this.userGrade = userGrade;
        this.grades = grades;
        this.seasonNumber = seasonNumber;
    }
}



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