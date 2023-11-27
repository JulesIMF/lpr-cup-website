import React, { useEffect, useState } from 'react'
import { TitleBar } from './shared/titlebar';
import { Button } from './shared/button'
import './styles/notfound.css';

export function NotFound() {
    return (
        <div className="notfound">
            <TitleBar text="Кубок ЛФИ потерялся..."/>
            <img src="images/hedgehog.webp" alt="" style={{ width: "300px", height: "300px", marginTop: "2%"}} />
            <div className='notfound_text_div'>
                <div className="notfound_text_header">
                    Ой, что-то потерялось...
                </div>
                <i className='notfound_text'>
                    Лучше вернуться на главный экран и разобраться с начала!
                </i>
            </div>
            <div style={{marginTop: "35px"}}>
                <Button text="Вернуться на главный экран" where='/' height="60px" width="500px" />  
            </div>
            
        </div>
    );
}
