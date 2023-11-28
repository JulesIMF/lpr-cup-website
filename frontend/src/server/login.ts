export class LogInData {
    email: string = "";
    password: string = "";

    public check() {
        const emailRegexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegexp.test(this.email)) {
            throw new Error("Некорректный адрес электронной почты!")
        }
    }
}