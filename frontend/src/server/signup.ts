import { postSignUpRequest } from './server'

export class SignUpData {
    surname: string = "";
    name: string = "";
    patronimic: string = "";
    country: string = "";
    region: string = "";
    currentGrade: string | number = "";
    participationGrades: string | Array<number> = "";
    telegram: string = "";
    email: string = "";
    password: string = "";
    confirm: string = "";

    /**
     * check
     */
    public checkAndPrepare() {
        if (this.surname == "") {
            throw new Error("Пустая фамилия!");
        }

        if (this.name == "") {
            throw new Error("Пустое имя!");
        }

        var currentGrade: number = Number(this.currentGrade);
        var participationGrades = new Array<number>;

        for (var grade = 9; grade <= 11; grade++) {
            if ((this.participationGrades as string).includes(String(grade))) {
                if (currentGrade > grade) {
                    throw new Error(`В ${currentGrade} классе нельзя участвовать за ${grade}!`)
                }
                participationGrades.push(grade);
            }
        }

        const emailRegexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegexp.test(this.email)) {
            throw new Error("Некорректный адрес электронной почты!")
        }

        if (this.password != this.confirm) {
            throw new Error("Пароли не совпадают!")
        }

        if (this.password.length < 8) {
            throw new Error("Слишком слабый пароль!")
        }

        this.participationGrades = participationGrades;
        this.currentGrade = currentGrade;
    }
}

export function signUp(data: SignUpData) {
    data.checkAndPrepare();
    // HACK: это, конечно, временное решение
    var promise = postSignUpRequest(data);
    promise.then((v) => {console.log(`Got ${v} on signup`)});
}
