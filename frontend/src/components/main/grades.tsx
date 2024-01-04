import React, {useEffect, useState} from 'react';
import {Screen} from './screen';
import {getSeasons, isAdmin} from '../../server/get';
import {Season} from "../../server/season";
import './styles/grades.css'
import {CentralHeader} from '../shared/central';
import {Button} from '../shared/button';
import {isLoggedIn} from '../../server/server';
import {useNavigate} from 'react-router-dom';

interface SeasonsListParams {
    seasons: Array<Season>;
}

function SeasonsList(params: SeasonsListParams) {
    return (
        <div className="grades_list">
            {
                params.seasons.map((season: Season) => {
                    return (
                        <div className="grades_season">
                            <div className="grades_labels_div">
                                <label className="grades_season_label">{`${season.seasonNumber} Сезон`}</label>
                                <label className="grades_season_user_label">{`(${season.year} год)`}</label>
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

function AddGrade() {
    if (!isAdmin()) {
        return <></>
    }

    return <Button height="45px" width="400px" where="/grades/add" caption="Добавить класс"/>
}

export function Grades() {
    var navigateTo = useNavigate()
    var [seasons, changeSeasons] = useState(new Array<Season>());

    // Выполняется один раз за загрузку страницы
    useEffect(() => {
        if (!isLoggedIn()) {
            navigateTo("/login")
        }
        getSeasons().then((loadedSeasons) => {
            if (loadedSeasons) {
                changeSeasons(loadedSeasons);
            }
        },)
    }, [])


    return (
        <Screen pageTitle="Выбор класса">
            <CentralHeader marginTop="50px" marginBottom="50px">
                Добро пожаловать домой!
            </CentralHeader>

            <AddGrade/>

            <SeasonsList seasons={seasons}/>
        </Screen>
    );
}


