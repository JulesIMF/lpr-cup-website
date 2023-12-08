import React, { useEffect, useState } from 'react';
import { Screen } from './screen';
import { isLoggedIn } from '../server/server';
import { useNavigate } from 'react-router-dom';
import './styles/cup.css'
import { LprCupEpisodePanel } from './lprcup/episode';
import { LprCupStudentPanel } from './lprcup/student';
import { LprCupDialog } from './lprcup/dialog';
import { getEpisodesCount, getStudentDialogs, isAdmin } from '../server/get';
import { Grades } from './grades';
import { StudentDialog } from '../server/studentdialog';

export function LprCup() {
    var navigateTo = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const seasonNumber = urlParams.get('season');
    const gradeNumber = urlParams.get('grade');

    var [episodesCount, episodesCountUpdate] = useState(0);
    var [students, studentsUpdate] = useState<Array<StudentDialog>>([]);

    var [activeEpisode, activeEpisodeUpdate] = useState(0); // Новости по умолчанию
    var [activeStudentId, activeStudentIdUpdate] = useState<number | undefined>(undefined); // Новости по умолчанию

    useEffect(() => {
        if (!isLoggedIn()) {
            navigateTo("/login")
        }

        if (seasonNumber == null ||
            gradeNumber == null ||
            Number.isNaN(Number(seasonNumber)) ||
            Number.isNaN(Number(gradeNumber))) {
            navigateTo("/grades")
        }

        getEpisodesCount(Number(seasonNumber!), Number(gradeNumber!)).then((loadedCount) => {
            console.log(`Всего эпизодов: ${loadedCount}`)
            episodesCountUpdate(loadedCount)
        },)
    }, [])

    useEffect(() => {
        if (isAdmin()) {
            getStudentDialogs(Number(seasonNumber!), Number(gradeNumber!), activeEpisode).then((loadedDialogs) => {
                studentsUpdate(loadedDialogs);
            })
        }
    }, [activeEpisode])

    if (isAdmin()) {
        return (
            <Screen
                pageTitle={`Кубок ЛФИ. ${gradeNumber} класс, ${seasonNumber} сезон`}
                titleBarCaption={`Кубок ЛФИ. ${gradeNumber} класс, ${seasonNumber} сезон`}
                hideFooter
            >
                <div id="lprcup_content">
                    <LprCupEpisodePanel episodesCount={episodesCount} activeEpisodeUpdate={activeEpisodeUpdate} />
                    {activeEpisode == 0? <></> : <LprCupStudentPanel dialogs={students} activeStudentIdUpdate={activeStudentIdUpdate}/>}
                    <LprCupDialog />
                </div>
            </Screen>
        );
    }

        
}


