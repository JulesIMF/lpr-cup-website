import React, { useEffect, useState } from 'react'
import { Screen } from './screen';
import { Button } from '../shared/button'
import './styles/grades.css';
import { CentralHeader, CentralText } from '../shared/central';
import {getTextBoxValue, TextBox} from "../shared/textbox";
import {useNavigate} from "react-router-dom";
import {isAdmin} from "../../server/get";

export function AddGrade() {
    let navigateTo = useNavigate();
    if (!isAdmin()) {
        navigateTo("/");
    }

    let [statusText, updateStatusText] = "";

    return (
        <Screen pageTitle="Добавить класс" titleBarCaption="Кубок ЛФИ потерялся..." hideFooter={true}>
            <div id="add_grades_params">
                <TextBox type="number" caption="Класс" width="400px" id="grade"></TextBox>
                <TextBox type="number" caption="Номер Сезона" width="400px" id="season"></TextBox>
                <TextBox type="number" caption="Год Сезона" width="400px" id="year"></TextBox>
            </div>

            <Button caption="Добавить класс" width="400px" height="45px" onClick={() => {
                try {
                    var grade = Number(getTextBoxValue("grade"))
                    var season = Number(getTextBoxValue("season"))
                    var year = Number(getTextBoxValue("year"))

                } catch (e) {

                }

            }}/>

            <label style={{color: "red", fontSize: "15px"}}>{statusText}</label>
        </Screen>
    );
}
