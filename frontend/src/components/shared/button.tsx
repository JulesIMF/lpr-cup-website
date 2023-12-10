import React, { useEffect, useState } from 'react';
import "./styles/button.css";

class ButtonParams {
    width?: string = "inherit";
    caption?: string;
    height?: string = "100px";
    where?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
                {params.caption}
            </a>
        );
    }

    // Действие
    return (
        <button className='yellow_button' onClick={params.onClick} style={{width: params.width, height: params.height}} type='button'>
            {params.caption}
        </button>
    );
}
