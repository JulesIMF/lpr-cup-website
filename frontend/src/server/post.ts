import { Dialog } from "./dialog";
import { isAdmin } from "./get";
import { Submission } from "./submission";
import { Message, RealMessage } from "./message";
import { requestToServer } from "./server";
import {Season} from "./season";

function escapeHtml (x: string) {
    const htmlEscapes: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
        " ": "&nbsp;",
        "\n": "<br/>"
      };
    
      return x.replace(/[&<>"'\n ]/g, (match) => htmlEscapes[match]);
};

export async function postTextMessage(dialog: Dialog, text: string, isSubmission: boolean) {
    requestToServer(
        "POST",
        "/api/postMessage",
        JSON.stringify({
            dialogId: dialog.id,
            text: text,
            isSubmission: isSubmission
        })
    )
}

export async function postSubmissionUpdate(submission: Submission) {
    let verdictObject: { [key: string]: string } = {};
    submission.verdict.forEach((value, key) => {
        verdictObject[key] = value;
    });

    let s = JSON.stringify({
        submissionId: submission.id,
        verdicts: verdictObject
    });

    return requestToServer(
        "PATCH",
        "/api/patchSubmission",
        s    
    )
}

export async function postNewGrade(season: number, year: number) {
    return requestToServer(
        "POST",
        "/api/newGrade",
        JSON.stringify({
            season: season,
            year: year
        })
    )
}

export class Task {
    public name: string;
    public weight: number;

    constructor(name: string, weight: number) {
        this.name = name;
        this.weight = weight;
    }
}

export async function postNewEpisode(season: number, grade: number, tasks: Task[]) {
    return requestToServer(
        "POST",
        "/api/newEpisode",
        JSON.stringify({
            season: season,
            grade: grade,
            tasks: tasks
        })
    )
}
