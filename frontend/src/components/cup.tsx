import React, { useEffect } from 'react';
import { Screen } from './screen';
import { isLoggedIn } from '../server/server';
import { useNavigate } from 'react-router-dom';

export function LprCup() {
    var navigateTo = useNavigate();
    useEffect(() => {
        if (!isLoggedIn()) {
            navigateTo("/grades")
        }
    }, [])
    
    const urlParams = new URLSearchParams(window.location.search);
    const seasonNumber = urlParams.get('season');
    const gradeNumber = urlParams.get('grade');
    
    return (
        <Screen 
            pageTitle={`Кубок ЛФИ. ${gradeNumber} класс, ${seasonNumber} сезон`}
            titleBarCaption={`Кубок ЛФИ. ${gradeNumber} класс, ${seasonNumber} сезон`}
            hideFooter>

        </Screen>
    );
}


