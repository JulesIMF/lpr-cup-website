import { SignUpData } from "./signup";
import { LogInData } from "./login";

var user: SignUpData | undefined = new SignUpData();
user.password = "11111111"
user.email = "doroshenko.ia@phystech.edu"

var loggedIn: boolean = false;

export async function postSignUpRequest(data: SignUpData): Promise<Response> {
    // HACK: один большой хак
    var promise = new Promise<Response>((resolve, reject) => {
        resolve(new Response())
    })

    user = data;
    return promise;
}

export async function postLogInRequest(data: LogInData): Promise<number> {
    // HACK: ещё один большой хак
    var promise = new Promise<number>((resolve, reject) => {
        if (user?.email == data.email && user?.password == data.password) {
            resolve(200);
            console.log("Logged in")
            loggedIn = true;
        }

        else {
            resolve(403);
        }
    })

    return promise;
}

export function isLoggedIn(): boolean {
    return loggedIn;
}
