import React from 'react'
import "./styles/footer.css"

export function Footer() {
    return (
        <footer>
            <div>
                <a href='https://phd.4mipt.ru/' style={{color: "black"}}>Отделение
                    физики</a>&nbsp;{new Date().getFullYear()}
            </div>
        </footer>);
}