import React, { useEffect, useState } from 'react';
import { TitleBar } from './shared/titlebar';
import { Button } from './shared/button';
import { Footer } from './shared/footer';
import './styles/screen.css';

interface ScreenParams {
    children?: React.ReactNode;
    pageTitle: string;
    hideFooter?: boolean;
    hideLogIn?: boolean;
    titleBarText?: string;
}

export function Screen(params: ScreenParams) {
    useEffect(()=>{
        document.title = params.pageTitle;
    });
    return (
        <div className="welcome">
            <TitleBar text={params.titleBarText} hideLogIn={params.hideLogIn}/>
            <div className="welcome_content">
                {params.children}
            </div>
            {params.hideFooter? <></> : <Footer />}
        </div>
    );
}


