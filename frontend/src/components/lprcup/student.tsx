import React, { useEffect, useState } from 'react';
import { Dialog } from '../../server/dialog';

// 
// Выбор эпизода
//
interface LprCupStudentSelectorParams {
    name: string;
    id: number;
    status: string;
    activeId: number | undefined;
    activeIdUpdate: React.Dispatch<React.SetStateAction<number | undefined>>;
    activeDialogUpdate: React.Dispatch<React.SetStateAction<Dialog>>;
    dialog: Dialog;
    date: Date;
}

function formatDate(date: Date) {
    var now = new Date(Date.now());
    if (now.getFullYear() != date.getFullYear()) {
        return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth()).padStart(2, "0")}.${String(date.getFullYear()).padStart(2, "0")}`;
    }

    if (now.getMonth() != date.getMonth() || (now.getDate() - date.getDate() > 1)) {
        return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth()).padStart(2, "0")}`;
    }

    if (now.getDate() - date.getDate() == 1) {
        return `Вчера в ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }

    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function truncateName(name: string) {
    if (name.length < 20) {
        return name;
    }

    return name.substring(0, 17) + "...";
}
function LprCupStudentSelector(params: LprCupStudentSelectorParams) {
    var className = "lprcup_student_selector" + ` lcss_${params.status}`;
    if (params.activeId == params.id) {
        className += " lcss_active";
    }

    return (
        <button
            className={className}
            onClick={(e) => {
                console.log(`Select ${params.id}`);
                params.activeIdUpdate(params.id);
                params.activeDialogUpdate(params.dialog)
            }}
        >
            <label className="lcss_name">
                {params.name}
            </label>
            <label className="lcss_date">{formatDate(params.date)}</label>
        </button>
    );
}
interface LprCupStudentsParams {
    dialogs: Array<Dialog>;
    activeId: number | undefined;
    activeIdUpdate: React.Dispatch<React.SetStateAction<number | undefined>>;
    activeDialogUpdate: React.Dispatch<React.SetStateAction<Dialog>>;
}

function LprCupStudents(params: LprCupStudentsParams) {
    var episodes = params.dialogs.map((dialog) => {
        return (
            <LprCupStudentSelector
                name={truncateName(dialog.name)}
                id={dialog.id}
                status={dialog.status}
                date={dialog.date}
                activeId={params.activeId}
                dialog={dialog}
                activeIdUpdate={params.activeIdUpdate}
                activeDialogUpdate={params.activeDialogUpdate} />
        );
    });

    return episodes;
}
interface LprCupStudentPanelParams {
    dialogs: Array<Dialog>;
    activeDialogUpdate: React.Dispatch<React.SetStateAction<Dialog>>;
}

export function LprCupStudentPanel(params: LprCupStudentPanelParams) {
    if (params.dialogs.length == 0) {
        return (
            <div>
                <div id='lprcup_student_panel'>
                    <center style={{ width: "100%", height: "100%", marginTop: "300px" }}><i>Здесь пока пусто...</i></center>
                </div>
            </div>);
    }
    var [activeId, activeIdUpdate] = useState<number | undefined>(undefined);

    return (
        <div>
            <div id='lprcup_student_panel'>
                {LprCupStudents({ dialogs: params.dialogs, activeId: activeId, activeIdUpdate: activeIdUpdate, activeDialogUpdate: params.activeDialogUpdate })}
            </div>
        </div>

    );
}
