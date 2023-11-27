import React, { useEffect, useState } from 'react';
import "./styles/titlebar.css";

interface TitleBarButtonParams {
    text: string;
    where: string;
}

function TitleBarButton(params: TitleBarButtonParams) {
    return (
        <a className='titlebar_a' href={params.where}>
            <b>{params.text}</b>
        </a>
    );
}

class TitleBarParams {
    hideLogIn?: boolean = false;
    text?: string
}

export function TitleBar(params: TitleBarParams) {
    var text: string | undefined = params.text;

    if (params.text == undefined) {
        text = "Кубок ЛФИ — это вы";
    }


    function TitleBarButtonsList() {
        var buttons = [
            <TitleBarButton text="Рейтинг" where="/rating"/>,
            <TitleBarButton text="Задания" where="/tasks"/>,
            <TitleBarButton text="Инфо" where="/info"/>
        ];

        if (!params.hideLogIn) {
            buttons.push(<TitleBarButton text="Войти" where="/login"/>)
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