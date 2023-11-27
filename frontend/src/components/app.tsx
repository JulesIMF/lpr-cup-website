import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom"
import {Welcome} from "./welcome";
import {Grades} from "./grades";
import {NotFound} from "./notfound";
import "./style.css";

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