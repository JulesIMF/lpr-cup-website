import React, {useEffect, useState} from 'react';
import {Screen} from './screen';
import {isLoggedIn} from '../../server/server';
import {useNavigate} from 'react-router-dom';
import './styles/cup.css'
import {LprCupEpisodePanel} from '../lprcup/episode';
import {LprCupStudentPanel} from '../lprcup/student';
import {LprCupDialog} from '../lprcup/dialog';
import {getAdminDialog, getEpisodesCount, getNewsDialog, getStudentDialogs, isAdmin} from '../../server/get';
import {Dialog} from '../../server/dialog';

export function LprCup() {
    var navigateTo = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const seasonNumberStr = urlParams.get('season');
    const gradeNumberStr = urlParams.get('grade');
    const season = Number(seasonNumberStr);
    const grade = Number(gradeNumberStr);

    var [episodesCount, episodesCountUpdate] = useState(0);
    var [students, studentsUpdate] = useState<Array<Dialog>>([]);

    useEffect(() => {
        if (!isLoggedIn()) {
            navigateTo("/login")
        }

        if (seasonNumberStr == null ||
            gradeNumberStr == null ||
            Number.isNaN(season) ||
            Number.isNaN(grade)) {
            navigateTo("/grades")
        }

        getEpisodesCount(season, grade).then((loadedCount) => {
            episodesCountUpdate(loadedCount)
        },)
    }, [])

    var [activeEpisode, activeEpisodeUpdate] = useState(1); // Новости по умолчанию
    var [activeDialog, activeDialogUpdate] = useState<Dialog | undefined>(undefined); // Новости по умолчанию

    useEffect(() => {
        if (activeEpisode == 0) {
            activeDialogUpdate(undefined);
            return;
        }
        if (isAdmin()) {
            getStudentDialogs(season, grade, activeEpisode).then((loadedDialogs) => {
                studentsUpdate(loadedDialogs);
                if (loadedDialogs.length > 0) {
                    // activeDialogUpdate(loadedDialogs[0]);
                } else {
                    activeDialogUpdate(undefined);
                }
            })
        } else {
            getAdminDialog(season, grade, activeEpisode).then((dialog) => {
                console.log(dialog);
                activeDialogUpdate(dialog);
            })
        }
    }, [activeEpisode])

    if (isAdmin()) {
        return (
            <Screen
                pageTitle={`Кубок ЛФИ. ${gradeNumberStr} класс, ${seasonNumberStr} сезон`}
                titleBarCaption={`Кубок ЛФИ. ${gradeNumberStr} класс, ${seasonNumberStr} сезон`}
                hideFooter
            >
                <div id="lprcup_content">
                    <LprCupEpisodePanel episodesCount={episodesCount} activeEpisodeUpdate={activeEpisodeUpdate}
                                        grade={grade} season={season}/>
                    {activeEpisode == 0 ? <></> :
                        <LprCupStudentPanel dialogs={students} activeDialogUpdate={activeDialogUpdate}/>}
                    <LprCupDialog dialog={activeDialog}/>
                </div>
            </Screen>
        );
    } else {
        return (
            <Screen
                pageTitle={`Кубок ЛФИ. ${gradeNumberStr} класс, ${seasonNumberStr} сезон`}
                titleBarCaption={`Кубок ЛФИ. ${gradeNumberStr} класс, ${seasonNumberStr} сезон`}
                hideFooter
            >
                <div id="lprcup_content">
                    <LprCupEpisodePanel episodesCount={episodesCount} activeEpisodeUpdate={activeEpisodeUpdate}
                                        grade={grade} season={season}/>
                    <LprCupDialog dialog={activeDialog}/>
                </div>
            </Screen>
        );
    }
}


