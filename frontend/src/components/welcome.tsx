import React, { useEffect, useState } from 'react'
import { TitleBar } from './shared/titlebar';
import { Button } from './shared/button'
import { Footer } from './shared/footer'
import { Screen } from './screen';
import './styles/welcome.css';

export function Welcome() {
    return (

        <Screen pageTitle="Добро пожаловать на Кубок ЛФИ!">
            <div className='welcome_text_div'>
                <div className="welcome_text_header">
                    Добро пожаловать на Кубок ЛФИ!
                </div>
                <i className='welcome_text'>
                    Перейди во вкладку <a href='/rules' style={{ color: "black" }}>“Правила”</a>, чтобы узнать про олимпиаду подробнее.<br />
                    Четвёртый Сезон Кубка ЛФИ закончился 3 июня 2023 г.
                </i>
            </div>

            <div className='welcome_login'>
                <img src="images/oleg.png" alt="" className="welcome_login_oleg" />

                <div className="welcome_login_buttons">
                    <Button text="Регистрация на Кубок ЛФИ" where='/signup' height="80px" width="700px" />
                    <Button text="Вход в личный кабинет (я уже Смешарик!)" where='/login' height="80px" width="700px" />
                </div>
            </div>

            <iframe
                width="1000"
                height="562"
                src="https://www.youtube.com/embed/aNELH_h9y0Q?si=590bA96PJ5xN8Eph"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen 
                style={{
                    marginTop: "80px",
                    marginBottom: "40px",
                }}
            />
        </Screen>
    );
}


