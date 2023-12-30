import React from 'react';
import { Screen } from './screen';
import { CentralHeader, CentralText } from '../shared/central';

export function Restoration() {
    return (
        <Screen pageTitle="Восстановление пароля" hideFooter>
            <div id="login_text">
                <CentralHeader>
                    Восстановление пароля
                </CentralHeader>

                <CentralText>
                    Пока что у нас нет автоматической формы восстановления...

                    <p>Напиши <a href="https://t.me/jules_imf">@jules_imf</a> (Ивану Дорошенко) в Телеграм,<br/>
                    он оперативно восстановит доступ!</p>
                </CentralText>
            </div>
        </Screen>
    );
}


