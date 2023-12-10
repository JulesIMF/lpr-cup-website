import { Dialog } from "./dialog";
import { isAdmin } from "./get";
import { Message, RealMessage } from "./message";
import { addNewMessages } from "./server";

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

export async function postTextMessage(dialog: Dialog, text: string, file?: File) {
    if (!isAdmin() && file) {
        // HACK: это все делает сервер
        text = "<a href=\"/lprcup/submission?id=456\">Попытка #2</a>" + text
    }

    addNewMessages([new RealMessage(escapeHtml(text), new Date(), true, file ? `/files/${file.name}` : undefined)]);
}

