export class Season {
    grades: Array<Number>;
    year: number;
    seasonNumber: number;

    constructor(year: number, seasonNumber: number, grades: Array<number>) {
        this.year = year;
        this.grades = grades;
        this.seasonNumber = seasonNumber;
    }
}
