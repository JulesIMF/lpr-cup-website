import React, { useEffect, useState } from 'react';
import { TitleBar } from './shared/titlebar';
import { Button } from './shared/button';
import { Footer } from './shared/footer';
import './styles/screen.css';

interface ScreenParams {
    children?: React.ReactNode
}

export function Screen(params: ScreenParams) {
    return (
        <div className="welcome">
            <TitleBar />
            <div className="welcome_content">
                {params.children}
            </div>
            <Footer />
        </div>
    );
}


