import { SignUpData } from "./signup";
import { LogInData } from "./login";
import { Message } from "./message";
import { useNavigate } from "react-router-dom";

class User extends SignUpData {
    public id: number = 0;
    public isAdmin: boolean = false;
}

var user: SignUpData | undefined = new SignUpData();

function redirect (url: string, asLink = true){
    asLink ? (window.location.href = url) : window.location.replace(url);
}

export async function requestToServer(
    method: string,
    url: string,
    body: any = undefined,
    addToken: boolean = true
) {
    if (addToken && !isLoggedIn()) {
        redirect("/");
    }

    return fetch(url, {
        method: method,
        body: body,
        headers: (
            addToken ? {
                'Content-Type': 'application/json; charset=UTF-8',
                'ApiToken': localStorage.getItem("lpr-cup-token")!
            } : { 'Content-Type': 'application/json; charset=UTF-8' }
        )
    });
}

export function whoAmI() {
    if (!isLoggedIn()) {
        return;
    }
    requestToServer(
        "GET",
        "/users/auth/signup"
    ).then(
        (v) => {
            if (!v.ok) {
                localStorage.removeItem("lpr-cup-token")
                redirect("/")
                return undefined;
            }

            return v.json()
        }
    ).then((v) => {
        if (v) {
            console.log("OOOO");
            console.log(v);
            user = new User();
            user.name = v.name;
            user.surname = v.surname;
            user.patronymic = v.patronymic;
            user.email = v.email;
            (user as User).isAdmin = v.isAdmin;
            (user as User).id = v.id;
        }
    })
}

export function getUser() {
    return user as User;
}

export function logOut() {
    requestToServer(
        "GET",
        "/users/logout"
    ).then((v) => {
        redirect("/");
    });

    localStorage.removeItem("lpr-cup-token");
}

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

    var f = requestToServer(
        "POST",
        "/users/auth/signin",
        JSON.stringify(data),
        false
    )

    var promise = f.then((v) => {
        console.log(v)
        if (v.ok) {
            // localStorage.setItem("lpr-cup-token", )
            v.json().then((v) => {localStorage.setItem("lpr-cup-token", v.token)});
        }

        return v.status
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
    return localStorage.getItem("lpr-cup-token") != null;
}
