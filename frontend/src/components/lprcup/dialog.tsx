import React, { useEffect, useRef, useState } from 'react';
import './styles/dialog.css'
import { getAllMessages, getNewIncomingMessages, isAdmin } from '../../server/get';
import { DateMessage, Message, RealMessage } from "../../server/message";
import { Dialog } from '../../server/dialog';
import { postTextMessage } from '../../server/post';

interface LprCupDialogSendParams {
    onClick: () => void;
}

interface LprCupDialogAttachmentParams {
    attachedFile: File | undefined;
    changeAttachedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

interface LprCupDialogSubmission {
    isSubmission: boolean;
    changeIsSubmission: React.Dispatch<React.SetStateAction<boolean>>;
}

function truncateFileName(name: string, maxLength: number): string {
    if (name.length <= maxLength) {
        return name;
    }

    const stem = name.slice(0, name.lastIndexOf('.'));
    const extension = name.slice(name.lastIndexOf('.'));
    const truncatedFileName = stem.slice(0, maxLength - extension.length - 4) + '....' + extension;

    return truncatedFileName;
}

function LprCupDialogAttachment(params: LprCupDialogAttachmentParams) {
    if (params.attachedFile == undefined) {
        return (
            <input
                type="file"
                id="lprcup_dialog_attach"
                className="lprcup_dialog_button"
                style={{ backgroundImage: "url(/images/attach.svg)" }}
                onChange={(e) => {
                    params.changeAttachedFile(e.target.files?.[0])
                }}
            />
        );
    }

    return (
        <div id="lprcup_dialog_unpin">
            <button
                id="lprcup_dialog_send"
                className="lprcup_dialog_button"
                style={{ backgroundImage: "url(/images/cross.svg)" }}
                onClick={(e) => {
                    params.changeAttachedFile(undefined);
                }}
            />

            {`Файл: ${truncateFileName(params.attachedFile.name, 20)}`}
        </div>
    )
}

function LprCupDialogIsSubmission(params: LprCupDialogSubmission) {
    if (params.isSubmission == false) {
        return (
            <button
                id="lprcup_dialog_attach"
                className="lprcup_dialog_button"
                style={{ backgroundImage: "url(/images/attach.svg)" }}
                onClick={(e) => {
                    params.changeIsSubmission(true);
                }}
            />
        );
    }

    return (
        <button
            id="lprcup_dialog_send"
            className="lprcup_dialog_button"
            style={{ backgroundImage: "url(/images/cross.svg)" }}
            onClick={(e) => {
                params.changeIsSubmission(false);
            }}
        />
    )
}

function LprCupDialogSend(params: LprCupDialogSendParams) {
    return (
        <button
            id="lprcup_dialog_send"
            className="lprcup_dialog_button"
            style={{ backgroundImage: "url(/images/send.png)" }}
            onClick={(e) => {
                params.onClick();
            }}
        />
    );
}

interface LprCupDialogTextareaParams {
    send: (text: string, isSubmission: boolean, attachedFile?: File) => void;
}

function LprCupDialogTextarea(params: LprCupDialogTextareaParams) {
    var [attachedFile, changeAttachedFile] = useState<File | undefined>(undefined);
    var [isSubmission, changeIsSubmission] = useState<boolean>(false);

    var sendWrapper = () => {
        var textField = document.getElementById("lprcup_dialog_textarea") as HTMLTextAreaElement;
        var text = textField.value;
        if (text != "" || attachedFile != undefined) {
            params.send(text, isSubmission);
            textField.value = "";
            changeAttachedFile(undefined);
            changeIsSubmission(false);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            sendWrapper();
        }
    }

    if (isAdmin()) {
        return (
            <div id="lprcup_dialog_input">
                {/* <LprCupDialogAttachment attachedFile={attachedFile} changeAttachedFile={changeAttachedFile} /> */}
                <textarea
                    id="lprcup_dialog_textarea"
                    placeholder="Напишите что-нибудь в чат..."
                    onKeyDown={onKeyDown}
                />
                <LprCupDialogSend onClick={sendWrapper} />
            </div>
        )
    } else {
        return (
            <div id="lprcup_dialog_input">
                {/* <LprCupDialogAttachment attachedFile={attachedFile} changeAttachedFile={changeAttachedFile} /> */}
                <LprCupDialogIsSubmission isSubmission={isSubmission} changeIsSubmission={changeIsSubmission}/>
                <textarea
                    id="lprcup_dialog_textarea"
                    placeholder="Напиши что-нибудь в чат или нажми на скрепку, чтобы отправить решение..."
                    onKeyDown={onKeyDown}
                />
                <LprCupDialogSend onClick={sendWrapper} />
            </div>
        )
    }
}

interface LprCupMessageParams {
    message: Message;
}

function formatDate(date: Date) {
    var now = new Date(Date.now());

    var monthWordGenetive = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    if (now.getFullYear() != date.getFullYear()) {
        return `${String(date.getDate()).padStart(2, "0")} ${monthWordGenetive[date.getMonth()]} ${String(date.getFullYear()).padStart(2, "0")} г.`;
    }

    if (now.getMonth() != date.getMonth() || (now.getDate() - date.getDate() > 1)) {
        return `${String(date.getDate()).padStart(2, "0")} ${monthWordGenetive[date.getMonth()]}`;
    }

    if (now.getDate() - date.getDate() == 1) {
        return `Вчера`;
    }

    return `Сегодня`;
}

function LprCupMessageAttachment(params: LprCupMessageParams) {
    var split = (params.message as RealMessage).attachmentUrl!.split('/');
    var name = split[split?.length - 1];
    const realMessage = params.message as RealMessage;
    return (
        <div className="lcm_attachment_div">
            <a
                className="lcm_pdf"
                style={{ backgroundImage: "url(/images/pdf.png)" }}
                href={realMessage.attachmentUrl}
            />
            <a href={realMessage.attachmentUrl!}>{name}</a>
        </div>
    )
}

function getTextWidth(text: string, fontSize: string) {
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';
    div.style.textAlign = "left";
    div.style.height = "fit-content";
    div.style.fontSize = fontSize;
    div.style.fontFamily = "Inter";

    div.innerHTML = text;
    document.body.appendChild(div);

    // Получаем размеры элемента до рендеринга
    const rect = div.getBoundingClientRect();

    // Ширина элемента до рендеринга
    const width = rect.width;

    // Удаляем временный элемент из DOM
    document.body.removeChild(div);

    return width;
}

function LprCupMessage(params: LprCupMessageParams) {
    if (params.message instanceof DateMessage) {
        return (
            <div className="lprcup_message lcm_date">
                {formatDate(params.message.date)}
            </div>
        );
    }

    var realMessage = (params.message as RealMessage)
    var width = 100;

    if (realMessage.attachmentUrl) {
        width = 400;
    }

    width = Math.max(width, getTextWidth(realMessage.text, "15px"));
    width = Math.min(width, 500);

    return (
        <div className={"lprcup_message lcm_real " + (realMessage.mine ? "lcm_mine" : "lcm_other")}>
            <span className="lcm_text" style={{ width: width }}>
                <text dangerouslySetInnerHTML={{ __html: realMessage.text.trimStart().trimEnd() }} style={{ width: width }}></text>
            </span>
            {realMessage.attachmentUrl ? <LprCupMessageAttachment message={params.message} /> : <></>}
            <label className="lcm_message_date">{`${String(params.message.date.getHours()).padStart(2, "0")}:${String(params.message.date.getMinutes()).padStart(2, "0")}`}</label>
        </div>
    )
}

interface LprCupMessagesParams {
    messages: Array<Message>;
}

function addDateMessages(messages: Message[]) {
    if (messages.length == 0) {
        return messages;
    }

    var messagesWithDate = new Array<Message>();
    var length = messages.length;

    messagesWithDate.push(new DateMessage(messages[length - 1].date), messages[length - 1]);
    for (var i = length - 2; i >= 0; i--) {
        var current = messages[i];
        var prev = messages[i + 1];
        if (
            current.date.getDate() != prev.date.getDate() ||
            current.date.getMonth() != prev.date.getMonth() ||
            current.date.getFullYear() != prev.date.getFullYear()
        ) {
            messagesWithDate.push(new DateMessage(current.date));
        }

        messagesWithDate.push(current);
    }

    messagesWithDate.reverse()

    return messagesWithDate;
}

function LprCupMessages(params: LprCupMessagesParams) {
    return (
        <div id="lprcup_dialog_messages">
            {
                addDateMessages(params.messages).map((message) => {
                    return (
                        <LprCupMessage message={message} />
                    )
                })
            }
        </div>
    );
}

interface LprCupDialogParams {
    dialog: Dialog | undefined;
}

export function LprCupDialog(params: LprCupDialogParams) {
    var [messages, messagesUpdate] = useState<Array<Message>>([]);
    var sendText = (x: string, isSubmission: boolean, attachedFile?: File,) => {
        if (params.dialog) {
            postTextMessage(params.dialog, x, isSubmission);
        }
    };

    useEffect(() => {
        console.log(params.dialog)
        if (params.dialog) {
            getAllMessages(params.dialog).then((loadedMessages) => {
                messagesUpdate(loadedMessages);
            })
        }
    }, [params.dialog])

    useEffect(() => {
        const interval = setInterval(() => {
            if (params.dialog) {
                getNewIncomingMessages(params.dialog).then((newMessages) => {
                    if (newMessages.length) {
                        messagesUpdate(currentMessages => [...newMessages, ...currentMessages]);
                    }
                });
            }
        }, 1000/*ms*/);

        return () => {
            clearInterval(interval);
        };
    }, [params.dialog]);

    return (
        <div id="lprcup_dialog">
            <span id="lprcup_dialog_title">{params.dialog ? params.dialog.name : "Диалог не выбран"}</span>
            <LprCupMessages messages={messages} />
            <LprCupDialogTextarea send={sendText} />
        </div>
    )
}
