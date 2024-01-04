import React from 'react';
import "./styles/textbox.css";

class Match {
    password: string;
    confirm: string;

    constructor(newPassword: string = "", newConfirm: string = "") {
        this.password = newPassword;
        this.confirm = newConfirm;
    }
}

export enum MatchState {
    Empty,
    LowSize,
    Matched,
    NotMatched
};

export class PasswordMatcher {
    protected state: Match;
    protected change: React.Dispatch<React.SetStateAction<Match>>;

    public constructor() {
        [this.state, this.change] = React.useState(new Match());
    }

    public onPasswordChange = (newPassword: string) => {
        this.change(new Match(newPassword, this.state.confirm));
    }

    public onConfirmChange = (newConfirm: string) => {
        this.change(new Match(this.state.password, newConfirm));
    }

    public isMatched() {
        if (this.state.password != this.state.confirm) {
            return MatchState.NotMatched;
        }

        if (this.state.password.length == 0) {
            return MatchState.Empty;
        }

        if (this.state.password.length < 8) {
            return MatchState.LowSize;
        }

        return MatchState.Matched;
    }
}

interface TextBoxParams {
    id: string;
    caption?: string;
    width?: string;
    type?: "text" |
        "password" |
        "email" |
        "number" |
        "search" |
        "tel" |
        "url" |
        "time";
    onChange?: (newValue: string) => void;
    onEnter?: () => void;
    passwordMatchState?: MatchState;
}

interface TextBoxLabelParams {
    caption?: string
    passwordMatches?: boolean;
}

export function getTextBoxValue(id: string) {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input == null) {
        throw new Error(`Внутренняя ошибка: нет поля id=${id}`)
    }

    return input.value;
}

export function TextBox(params: TextBoxParams) {
    var width = (params.width ? params.width : "100px")

    var onInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        var value = target.value;
        params.onChange?.(value);
    }

    var onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" || e.code == "NumpadEnter") {
            params.onEnter?.();
        }
    }

    if (params.type != "password" ||
        params.passwordMatchState == undefined ||
        params.passwordMatchState == MatchState.Empty) {

        return (
            <div className="textbox">
                <label>{params.caption}</label>
                <input
                    type={params.type}
                    id={params.id}
                    style={{width: width}}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                />
            </div>
        );
    }

    function getColor(state: MatchState) {
        if (params.passwordMatchState == MatchState.Matched) {
            return "green";
        }

        return "red";
    }

    function getPasswordCaption(state: MatchState) {
        switch (params.passwordMatchState) {
            case MatchState.Empty:
                // Если почему-то прошли с предыдущего шага
                return "";
            case MatchState.LowSize:
                return "Меньше 8 символов!"
            case MatchState.NotMatched:
                return "Пароли не совпадают!"
            case MatchState.Matched:
                return "Пароли совпадают"
        }
    }

    return (
        <div className="textbox">
            <div className='password_matcher_div'>
                <label>{params.caption}</label>
                <label className="password_matcher" style={{color: getColor(params.passwordMatchState)}}>
                    {getPasswordCaption(params.passwordMatchState)}
                </label>
            </div>

            <input
                type={params.type}
                id={params.id}
                style={{width: width}}
                onInput={onInput}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}
