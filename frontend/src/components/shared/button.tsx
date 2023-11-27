import React, { useEffect, useState } from 'react';
import "./styles/button.css";

class ButtonParams {
    width?: string = "inherit";
    text?: string;
    height?: string = "100px";
    where?: string;
    action?: () => void;
}

export function Button(params: ButtonParams) {
    // Переход по ссылке
    if (params.where != undefined) {
        return (
            <a 
                className='yellow_button' 
                style={{width: params.width, height: params.height}}
                href={params.where}
            >
                {params.text}
            </a>
        );
    }

    // Действие
    return (
        <button className='yellow_button' onClick={params.action} style={{width: params.width, height: params.height}} type='button'>
            {params.text}
        </button>
    );
}
