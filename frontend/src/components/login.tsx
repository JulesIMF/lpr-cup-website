import React, { useState } from 'react';
import { Screen } from './screen';
import { Button } from './shared/button';
import './styles/login.css';
import { CentralHeader, CentralText } from './shared/central';
import { TextBox, getTextBoxValue } from './shared/textbox';
import { postLogInRequest } from '../server/server';
import { LogInData } from '../server/login';
import { useNavigate } from 'react-router-dom';

export function LogIn() {
    var navigateTo = useNavigate();
    var [failText, updateFailText] = useState("");
    var processLogin = () => {
        var data: LogInData = new LogInData();
        data.email = getTextBoxValue("email");
        data.password = getTextBoxValue("password");

        var response = postLogInRequest(data);
        response.then((v) => {
            if (v == 200) {
                navigateTo("/grades")
            }

            else {
                updateFailText("Неправильные данные для входа!");
            }
        })
    };

    return (
        <Screen pageTitle="Вход в личный кабинет" hideFooter>
            <div id="login_text">
                <CentralHeader>
                    Вход в личный кабинет
                </CentralHeader>

                <CentralText>
                    Введи данные, указанные при регистрации.
                </CentralText>
            </div>

            <div id="login_form">
                <TextBox id="email" type="email" caption="Электронная почта" width="700px" onEnter={processLogin}/>
                <TextBox id="password" type="password" caption="Пароль" width="700px" onEnter={processLogin}/>
                <label id="login_fail">{failText}</label>
                <Button caption="Войти в личный кабинет" width="700px" height="60px" action={processLogin}/>
                <a id="login_restoration" href="/restoration">Не можешь войти?</a>
            </div>
        </Screen>
    );
}


