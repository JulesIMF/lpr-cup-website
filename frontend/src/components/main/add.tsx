import React, { useState } from 'react'
import { Screen } from './screen';
import { Button } from '../shared/button'
import './styles/add.css';
import {getTextBoxValue, TextBox} from "../shared/textbox";
import {useNavigate} from "react-router-dom";
import {getEpisodesCount, isAdmin} from "../../server/get";
import {postNewEpisode, postNewGrade, Task} from "../../server/post";

interface TaskInputParams {
    id: number;
    deleteMyself: () => void;
}

function TaskInput (params: TaskInputParams) {
    function RemoveButton() {
        return (
            <button
                className="add_episode_selector_remove"
                style={{backgroundImage: "url(/images/cross.svg)"}}
                onClick={(e) => {
                    params.deleteMyself();
                }}
            />
        )
    }

    return (
        <div id={`add_episode_selector_${params.id}`} className="add_episode_selector">
            <TextBox type="text" caption="Имя" width="200px" id={`add_episode_selector_name_${params.id}`} />
            <TextBox type="number" caption="Вес" width="200px" id={`add_episode_selector_weight_${params.id}`} />
            <RemoveButton />
        </div>
    )
}

export function AddEpisode() {
    let navigateTo = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const seasonNumberStr = urlParams.get('season');
    const gradeNumberStr = urlParams.get('grade');
    const season = Number(seasonNumberStr);
    const grade = Number(gradeNumberStr);

    if (!isAdmin()) {
        navigateTo("/grades")
    }

    if (seasonNumberStr == null ||
        gradeNumberStr == null ||
        Number.isNaN(season) ||
        Number.isNaN(grade)) {
        navigateTo("/grades")
    }

    let [tasks, tasksUpdate] = useState({} as { [key: number]: Task }  );
    let [currentId, currentIdUpdate] = useState(0);
    let [statusText, updateStatusText] = useState("");

    let selectors = [];
    for (let k in tasks) {
        selectors.push(<TaskInput id={Number(k)} deleteMyself={() => {
            tasksUpdate((t) => {
                let o = {} as { [key: number]: Task};

                for (let ik in t) {
                    if (ik != k) {
                        o[Number(ik)] = t[Number(ik)];
                    }
                }

                return o;
            });
        }}/>)
    }

    return (
        <Screen pageTitle="Добавить эпизод" titleBarCaption="Новый эпизод" hideFooter={false}>
            <div id="add_params">
                {selectors}
                <u><a onClick={() => {
                    tasksUpdate((t) => {
                        t[`${currentId}`] = new Task("", 0.0);
                        return t;
                    })

                    currentIdUpdate(currentId + 1);
                }} style={{cursor: "pointer", }}>Добавить задание</a></u>
            </div>

            <Button caption="Добавить эпизод" width="400px" height="45px" onClick={() => {
                try {
                    // let season = Number(getTextBoxValue("season"));
                    // let grade = Number(getTextBoxValue("grade"));
                    let tasksArray = []
                    let sum = 0;
                    for (let k in tasks) {
                        let task = tasks[Number(k)];
                        task.name = getTextBoxValue(`add_episode_selector_name_${k}`)
                        task.weight = Number(getTextBoxValue(`add_episode_selector_weight_${k}`))

                        if (task.weight < 0) {
                            throw new Error(`Задача ${task.name} имеет отрицательный вес`);
                        }

                        task.weight = Math.round(task.weight * 100) / 100;
                        sum += task.weight;

                        tasksArray.push(task);
                    }

                    if (sum != 10) {
                        throw new Error("Сумма задач не 10!");
                    }

                    postNewEpisode(season, grade, tasksArray).then(r => {
                        if (r.ok) {
                            navigateTo("/grades");
                        } else {
                            updateStatusText(`Ошибка ${r.status}`)
                        }
                    })
                } catch (e) {
                    updateStatusText(`Ошибка: ${e}`);
                }
            }}/>

            <label style={{color: "red", fontSize: "15px"}}>{statusText}</label>
        </Screen>
    );
}

export function AddSeasons() {
    let navigateTo = useNavigate();
    if (!isAdmin()) {
        navigateTo("/");
    }

    let [statusText, updateStatusText] = useState("");

    return (
        <Screen pageTitle="Добавить класс" titleBarCaption="Новый класс" hideFooter={false}>
            <div id="add_params">
                <TextBox type="number" caption="Номер Сезона" width="400px" id="season"></TextBox>
                <TextBox type="number" caption="Год Сезона" width="400px" id="year"></TextBox>
            </div>

            <Button caption="Добавить класс" width="400px" height="45px" onClick={() => {
                try {
                    let season = Number(getTextBoxValue("season"))
                    let year = Number(getTextBoxValue("year"))
                    postNewGrade(season, year).then(r => {
                        if (r.ok) {
                            navigateTo("/grades");
                        } else {
                            updateStatusText(`Ошибка ${r.status}`)
                        }
                    })
                } catch (e) {
                    updateStatusText(`Ошибка: ${e}`);
                }
            }}/>

            <label style={{color: "red", fontSize: "15px"}}>{statusText}</label>
        </Screen>
    );
}
