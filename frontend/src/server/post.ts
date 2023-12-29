import { Dialog } from "./dialog";
import { isAdmin } from "./get";
import { Submission } from "./submission";
import { Message, RealMessage } from "./message";
import { addNewMessages, requestToServer } from "./server";

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

    var s = JSON.stringify({
        submissionId: submission.id,
        verdicts: verdictObject
    })

    requestToServer(
        "PATCH",
        "/api/patchSubmission",
        s    
    )

    console.log(s);
}
