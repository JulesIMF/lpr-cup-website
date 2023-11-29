import React, { useEffect, useState } from 'react';
import { Screen } from './screen';
import { Season, getSeasons } from '../server/get';
import './styles/grades.css'
import { CentralHeader } from './shared/central';
import { Button } from './shared/button';
import { isLoggedIn } from '../server/server';
import { useNavigate } from 'react-router-dom';

interface SeasonsListParams {
    seasons: Array<Season>;
}

function SeasonsList(params: SeasonsListParams) {
    console.log(params.seasons)
    return (
        <div className="grades_list">
            {
                params.seasons.map((season: Season) => {
                    return (
                        <div className="grades_season">
                            <div className="grades_labels_div">
                                <label className="grades_season_label">{`${season.seasonNumber} Сезон`}</label>
                                <label className="grades_season_user_label">{`(${season.year} год, твой ${season.userGrade} класс)`}</label>
                            </div>
                            <div className="grades_buttons_div">
                                {
                                    season.grades.map((grade: Number) => {
                                        return (
                                            <Button 
                                                height="90px" 
                                                width="300px" 
                                                where={`/lprcup?season=${season.seasonNumber}&grade=${grade}`}
                                                caption={`${grade} класс`}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export function Grades() {
    var navigateTo = useNavigate()      
    var [seasons, changeSeasons] = useState(new Array<Season>());

    // Выполняется один раз за загрузку страницы
    useEffect(() => {
        console.log(isLoggedIn());
        if (!isLoggedIn()) {
            navigateTo("/login")
        }
        console.log(seasons)
        getSeasons().then((loadedSeasons) => {
            console.log(loadedSeasons)
            changeSeasons(loadedSeasons);
            console.log("Changed")
        },)
    }, [])
    

    return (
        <Screen pageTitle="Выбор класса">
            <CentralHeader marginTop="50px" marginBottom="50px">
                Добро пожаловать домой!
            </CentralHeader>

            <SeasonsList seasons={seasons}/>
        </Screen>
    );
}


