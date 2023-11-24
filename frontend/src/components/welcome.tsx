import React, { useEffect, useState } from 'react'
import { TitleBar } from './shared/titlebar';
import './style.css';

export function Welcome() {
    return (
        <div className="welcome">
            <div className='titlebar-wrap'><TitleBar/></div>
            <div>Welcome</div>
        </div>
    );
}