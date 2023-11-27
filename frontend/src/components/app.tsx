import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Grades } from "./grades";
import { NotFound } from "./notfound";
import "./style.css";
import { Welcome } from "./welcome";

const loggedIn = (() => false);

export function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={false ? <Navigate to="/grades"/> : <Welcome/>} />
                    <Route path="/grades" element={<Grades/>} />

                    // 404
                    <Route path="/404" element={<NotFound/>} />
                    <Route path="*" element={<Navigate to="/404"/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}