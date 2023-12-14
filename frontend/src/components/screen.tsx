import React, { useEffect, useState } from 'react';
import { TitleBar } from './shared/titlebar';
import { Button } from './shared/button';
import { Footer } from './shared/footer';
import './styles/screen.css';

interface ScreenParams {
    children?: React.ReactNode;
    pageTitle: string;
    hideFooter?: boolean;
    titleBarCaption?: string;
    direction?: string;
}

export function Screen(params: ScreenParams) {
    useEffect(()=>{
        document.title = params.pageTitle;
    });
    
    return (
        <div className="screen">
            <TitleBar text={params.titleBarCaption}/>
            <div className="screen_content">
                {params.children}
            </div>
            {params.hideFooter? <></> : <Footer />}
        </div>
    );
}
