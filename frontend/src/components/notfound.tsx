import React, { useEffect, useState } from 'react'
import { Screen } from './screen';
import { Button } from './shared/button'
import './styles/notfound.css';
import { CentralHeader, CentralText } from './shared/central';

export function NotFound() {
    return (
        <Screen pageTitle="Кубок ЛФИ потерялся..." titleBarCaption="Кубок ЛФИ потерялся..." hideFooter={true}>
            <img src="images/hedgehog.webp" alt="" style={{ width: "300px", height: "300px", marginTop: "2%" }} />
            <div className="notfound_text_div">
                <CentralHeader>
                    Ой, что-то потерялось...
                </CentralHeader>

                <CentralText>
                    <i className="notfound_text">
                        Лучше вернуться на главный экран и разобраться с начала!
                    </i>
                </CentralText>
            </div>
            <div style={{ marginTop: "35px" }}>
                <Button caption="Вернуться на главный экран" where="/" height="60px" width="500px" />
            </div>
        </Screen>
    );
}
