import React from 'react';
import "./styles/select.css";

interface SelectParams {
    children: React.ReactNode;
    id: string;
    caption?: string;
    width?: string;
    onChange?: (newValue: string) => void;
}

export function getSelectValue(id: string) {
    const select = document.getElementById(id) as HTMLSelectElement | null;
    if (select == null) {
        throw new Error(`Внутренняя ошибка: нет поля id=${id}`)
    }

    return select.value;
}

export function Select(params: SelectParams) {
    var width = (params.width ? params.width : "100px")

    return (
        <div className="select_list">
            <label>{params.caption}</label>
            <select
                id={params.id}
                style={{width: width}}
                onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    var value = target.value;
                    params.onChange?.(value);
                }}
            >
                {params.children}
            </select>
        </div>
    );
}

export function ChooseValue(id: string, value: string) {

}