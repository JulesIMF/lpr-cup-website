import React, {useState} from 'react';
import { Screen } from './screen';
import { PlainText } from '../shared/plain';

export function About() {
    let [text, updateText] = useState("");
    fetch("/html/about.html").then(r => r.text()).then(
        s => {updateText(s)}
    );

    return (
        <Screen pageTitle="Про Кубок ЛФИ">
            <PlainText>
                 <div style={{width: "100%"}} dangerouslySetInnerHTML={{ __html: text }} />
            </PlainText>
        </Screen>
    );
}

export function Rules() {
    let [text, updateText] = useState("");
    fetch("/html/rules.html").then(r => r.text()).then(
        s => {updateText(s)}
    );

    return (
        <Screen pageTitle="Правила Кубка ЛФИ">
            <PlainText>
                 <div style={{width: "100%"}} dangerouslySetInnerHTML={{ __html: text }} />
            </PlainText>

            <div style={{width: "100%", alignItems: "center"}}>
                <iframe
                    width="1530"
                    height="880px"
                    src="https://www.youtube.com/embed/4LkLX_Hb2Dc?si=WIe43NY5yQhrgRIP"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen />
            </div>
        </Screen>
    );
}
