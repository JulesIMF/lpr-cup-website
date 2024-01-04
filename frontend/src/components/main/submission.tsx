import React, { ReactNode, useEffect, useState } from 'react';
import { Screen } from './screen';
import { CentralHeader, CentralText } from '../shared/central';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../server/server';
import { getSubmission, isAdmin } from '../../server/get';
import { Submission } from "../../server/submission";
import './styles/submission.css'
import { Button } from '../shared/button';
import { postSubmissionUpdate } from '../../server/post';

interface LprCupSubmissionOverviewParams {
    submission: Submission | undefined;
    updateSubmission: React.Dispatch<React.SetStateAction<Submission | undefined>>;
}

interface LprCupTaskSpanParams {
    task: string;
    verdict: string;
    currentSubmission: Submission;
    onClick?: (id: string, currentSubmission: Submission) => void;
}

function LprCupTaskSpan(params: LprCupTaskSpanParams) {
    return <span
        className={`lpr_cup_verdict_span lcvs_${params.verdict}`}
        onClick={(e) => { params.onClick?.(params.task, params.currentSubmission) }}>
        {params.verdict.toUpperCase()}
    </span>
}

function LprCupSubmissionOverview(params: LprCupSubmissionOverviewParams) {
    if (params.submission == undefined) {
        return <></>;
    }



    var entries = new Array<ReactNode>();

    var onClick = (task: string, currentSubmission: Submission) => {
        if (!isAdmin()) {
            return;
        }

        params.updateSubmission(
            currentSubmission?.nextVerdict(task)
        )
    }

    for (var task of params.submission.verdict.keys()) {
        entries.push(
            <tr id="lpr_cup_submission_overview">
                <th>
                    <span className="lpr_cup_task_span">
                        {task}
                    </span>
                </th>
                <th><LprCupTaskSpan
                    task={task}
                    verdict={params.submission.verdict.get(task)!}
                    currentSubmission={params.submission}
                    onClick={onClick}
                />
                </th>
            </tr>
        )
    }

    return (
        <>
            <i id="lcso_checked">{params.submission.checked ? "Попытка проверена" : "Попытка не проверена"}</i>
            <table>
                {
                    entries
                }
            </table>
        </>
    )
}

export function LprCupSubmission() {
    var navigateTo = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const submissionIdStr = urlParams.get('id');
    const submissionId = Number(submissionIdStr);

    var [submission, updateSubmission] = useState<Submission | undefined>(undefined);
    var [status, updateStatus] = useState({ caption: "", type: "ok" });

    useEffect(() => {
        if (!isLoggedIn()) {
            navigateTo("/login");
        }

        if (Number.isNaN(submissionId)) {
            navigateTo("/grades");
        }

        getSubmission(submissionId).then((loadedSubmission) => {
            updateSubmission(loadedSubmission);
        });
    }, [])

    return (
        <Screen pageTitle="Попытка по Эпизоду" hideFooter>
            <div id="submission_screen">
                <CentralHeader>
                    {
                        submission ?
                            `Попытка #${submission.trial} (${submission.grade}.s${submission.season}.${submission.episode}), ${submission.studentName}`
                            : "Попытка"
                    }
                </CentralHeader>

                <CentralText>
                </CentralText>

                {
                    isAdmin() ?
                        <CentralText>
                            Нажимайте на кнопки напротив пункта, чтобы поменять вердикт.
                        </CentralText>
                        :
                        <></>
                }

                <LprCupSubmissionOverview submission={submission} updateSubmission={updateSubmission} />

                {
                    isAdmin() ?
                        <div id="lcss_update">
                            <Button
                                width='300px'
                                height="75px"
                                caption="Проверить"
                                onClick={() => {
                                    if (submission && !submission?.isCheckCompleted()) {
                                        updateStatus(
                                            { caption: "Остались непроверенные задачи!", type: "error" }
                                        )
                                    } else {
                                        updateSubmission(submission!.setChecked())
                                        postSubmissionUpdate(submission!);
                                        updateStatus(
                                            { caption: "Проверено!", type: "ok" }
                                        )
                                    }
                                }}
                            />

                            <label id="lpr_cup_submission_status" className={`lcss_${status.type}`}>{status.caption}</label>
                        </div> :
                        <></>
                }
            </div>
        </Screen>
    );
}


