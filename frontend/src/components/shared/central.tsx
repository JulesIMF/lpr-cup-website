import React from 'react';
import "./styles/central.css";

interface CentralParams {
    children?: React.ReactNode;
}

export function CentralHeader(params: CentralParams) {
    return (
        <div className="central central_header">
            {params.children}
        </div>);
}

export function CentralText(params: CentralParams) {
    return (
        <div className="central central_text">
            {params.children}
        </div>);
}