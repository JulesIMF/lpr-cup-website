import React, { useEffect, useState } from 'react';
import "./style.css";

export function TitleBar() {
    return (
        <div className="titlebar">
            <div className='titlebar_logo' style={{ backgroundImage: "url(images/lprcup_logo.jpg)"}}>
            </div>
            Кубок ЛФИ — это вы
            <div className='navigation_buttons'>
                Buttons
            </div>
        </div>
    );
}