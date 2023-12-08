export class Season {
    grades: Array<Number>;
    year: number;
    userGrade: number;
    seasonNumber: number;

    constructor(year: number, seasonNumber: number, userGrade: number, grades: Array<number>) {
        this.year = year;
        this.userGrade = userGrade;
        this.grades = grades;
        this.seasonNumber = seasonNumber;
    }
}
