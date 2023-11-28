import { SignUpData } from "./signup";

var user: SignUpData | undefined = undefined;

export async function postSignUpRequest(data: SignUpData): Promise<Response> {
    // HACK: один большой хак
    var promise = new Promise<Response>((resolve, reject) => {
        resolve(new Response())
    })

    user = data;
    return promise;
}