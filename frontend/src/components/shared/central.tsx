import React from 'react';
import "./styles/central.css";

interface CentralParams {
    marginTop?: string;
    marginBottom?: string;
    children?: React.ReactNode;
}

export function CentralHeader(params: CentralParams) {
    return (
        <div className="central central_header"
             style={{marginTop: params.marginTop, marginBottom: params.marginBottom}}>
            {params.children}
        </div>);
}

export function CentralText(params: CentralParams) {
    return (
        <div className="central central_text" style={{marginTop: params.marginTop, marginBottom: params.marginBottom}}>
            {params.children}
        </div>);
}