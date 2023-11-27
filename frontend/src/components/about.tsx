import React from 'react';
import { Screen } from './screen';
import { PlainText } from './shared/plain';
// import './styles/about.css';
import about from "./html/about.html";
import rules from "./html/rules.html";

export function About() {
    return (
        <Screen pageTitle="Про Кубок ЛФИ">
            <PlainText>
                <div style={{width: "100%"}} dangerouslySetInnerHTML={{ __html: about }} />
            </PlainText>
        </Screen>
    );
}

export function Rules() {
    return (
        <Screen pageTitle="Правила Кубка ЛФИ">
            <PlainText>
                <div style={{width: "100%"}} dangerouslySetInnerHTML={{ __html: rules }} />
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
