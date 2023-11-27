import React, { useEffect, useState } from 'react'
import { Screen } from './screen';
import { Button } from './shared/button'
import './styles/notfound.css';

export function NotFound() {
    return (
        <Screen titleBarText='Кубок ЛФИ потерялся...' hideFooter={true}>
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
        </Screen>
    );
}
