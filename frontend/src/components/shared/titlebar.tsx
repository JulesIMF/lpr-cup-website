import React, { useEffect, useState } from 'react';
import "./styles/titlebar.css";
import { isLoggedIn } from '../../server/server';

interface TitleBarButtonParams {
    id: string;
    text: string;
    where: string;
}

function TitleBarButton(params: TitleBarButtonParams) {
    return (
        <a className='titlebar_a' href={params.where} key={params.id}>
            <b>{params.text}</b>
        </a>
    );
}

class TitleBarParams {
    text?: string
}

export function TitleBar(params: TitleBarParams) {
    var text: string | undefined = params.text;

    var [addCaption, changeAddCaption] = useState((document.getElementById('root') as HTMLElement).clientWidth > 850);

    if (params.text == undefined && addCaption) {
        text = "Кубок ЛФИ — это вы";
    }

    function TitleBarButtonsList() {
        var buttons = [
            // <TitleBarButton id="rating" text="Рейтинг" where="/rating"/>,
            // <TitleBarButton id="tasks" text="Задания" where="/tasks"/>,
            <TitleBarButton id="info" text="Инфо" where="/info"/>
        ];

        if (!isLoggedIn()) {
            buttons.push(<TitleBarButton id="login" text="Войти" where="/login"/>)
        }

        else {
            // buttons.push(<TitleBarButton id="login" text="Настройки" where="/settings"/>)
        }

        return (
            <React.Fragment>
                {buttons}
            </React.Fragment>
        );
    }

    return (
        <header className="titlebar">
            {/* Логотип */}
            <a className='titlebar_logo' style={{ backgroundImage: "url(/images/lprcup_logo.jpg)" }} href='/' />

            {/* Надпись */}
            <b className='titlebar_lprcupisyou'>
                {text}
            </b>

            {/* Кнопки */}
            <div className='titlebar_a_div'>
                <TitleBarButtonsList />
            </div>
        </header>
    );
}