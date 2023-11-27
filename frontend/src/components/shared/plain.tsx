import React from 'react';
import "./styles/plain.css";

interface CentralParams {
    children?: React.ReactNode;
}

export function PlainText(params: CentralParams) {
    return (
        <div className="plain_text">
            {params.children}
        </div>);
}