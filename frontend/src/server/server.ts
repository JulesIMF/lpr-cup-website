import { SignUpData } from "./signup";
import { LogInData } from "./login";
import { Message } from "./message";

var user: SignUpData | undefined = new SignUpData();
user.password = "11111111"
user.email = "doroshenko.ia@phystech.edu"

var loggedIn: boolean = true;

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

export var newMessages = new Array<Message>();

export function addNewMessages(extraMessages: Array<Message>) {
    newMessages = newMessages.concat(extraMessages);
}

export function extractNewMessages() {
    if (newMessages.length == 0) {
        return []
    }

    var oldNewMessages = newMessages;
    newMessages = new Array<Message>();
    return oldNewMessages;
}

export function isLoggedIn(): boolean {
    return loggedIn;
}
