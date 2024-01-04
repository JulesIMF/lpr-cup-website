import {SignUpData} from "./signup";
import {LogInData} from "./login";
import {termiateAwait} from "./utils";

class User extends SignUpData {
    public id: number = 0;
    public isAdmin: boolean = false;
}

var user: SignUpData | undefined = new SignUpData();

function redirect(url: string, asLink = true) {
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
            } : {'Content-Type': 'application/json; charset=UTF-8'}
        )
    });
}

function whoAmIUnwrapped() {
    if (!isLoggedIn()) {
        return;
    }
    console.log("WhoAmI?");

    let promise = requestToServer(
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
            console.log("then")
            console.log(v);
            user = new User();
            user.name = v.name;
            user.surname = v.surname;
            user.patronymic = v.patronymic;
            user.email = v.email;
            (user as User).isAdmin = v.isAdmin;
            (user as User).id = v.id;
        }
    }).catch((e) => {
        console.log("error")
        console.log(e);
    })

    return promise;
}

export let [whoAmI, whoAmITerminated] = termiateAwait(whoAmIUnwrapped);

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
    return requestToServer(
        "POST",
        "/users/auth/signup",
        JSON.stringify(data),
        false
    );
}

export async function postLogInRequest(data: LogInData): Promise<number> {
    // HACK: ещё один большой хак

    var f = requestToServer(
        "POST",
        "/users/auth/signin",
        JSON.stringify(data),
        false
    )

    return f.then((v) => {
        console.log(v)
        if (v.ok) {
            // localStorage.setItem("lpr-cup-token", )
            v.json().then((v) => {
                localStorage.setItem("lpr-cup-token", v.token)
            });
        }

        return v.status
    });
}

export function isLoggedIn(): boolean {
    return localStorage.getItem("lpr-cup-token") != null;
}
