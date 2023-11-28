import React from 'react';
import { Screen } from './screen';
import { Button } from './shared/button';
import './styles/login.css';
import { CentralHeader, CentralText } from './shared/central';
import { TextBox } from './shared/textbox';




export function LogIn() {
    var onClick = () => {

    };

    return (
        <Screen pageTitle="Вход в личный кабинет" hideFooter>
            <div id="login_text">
                <CentralHeader>
                    Восстановление пароля
                </CentralHeader>

                <CentralText>
                    Введи данные, указанные при регистрации.
                </CentralText>
            </div>

            <div id="login_form">
                <TextBox id="email" type="email" caption="Электронная почта" width="700px" />
                <TextBox id="password" type="password" caption="Пароль" width="700px" />
                <Button caption="Войти в личный кабинет" width="700px" height="60px" action={onClick}/>
                <a id="login_restoration" href="/restoration">Не можешь войти?</a>
            </div>
        </Screen>
    );
}


