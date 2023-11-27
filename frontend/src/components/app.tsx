import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Grades } from "./grades";
import { NotFound } from "./notfound";
import "./style.css";
import { Welcome } from "./welcome";
import { SignUp } from './signup';
import { LogIn } from './login';
import { About } from './about';
import { Rules } from './about';

const loggedIn = (() => false);

export function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={false ? <Navigate to="/grades"/> : <Welcome/>} />
                    <Route path="/grades" element={<Grades/>} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/login" element={<LogIn/>} />

                    <Route path="/info" element={<Outlet/>}>
                        <Route index element={<About/>} />
                        <Route path="rules" element={<Rules/>} />
                    </Route>

                    // 404
                    <Route path="/404" element={<NotFound/>} />
                    <Route path="*" element={<Navigate to="/404"/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}