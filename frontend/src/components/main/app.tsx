import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Grades } from "./grades";
import { NotFound } from "./notfound";
import "./style.css";
import { Welcome } from "./welcome";
import { SignUp } from './signup';
import { LogIn } from './login';
import { About } from './about';
import { Rules } from './about';
import { Restoration } from './restoration';
import { LprCup } from './lprcup';
import { LprCupSubmission } from './submission';
import { whoAmI } from '../../server/server';
import {AddGrade} from "./addgrade";

export function App() {
    whoAmI();
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>} />
                    <Route path="/grades" element={<Grades/>} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/login" element={<LogIn/>} />
                    <Route path="/restoration" element={<Restoration/>} />

                    <Route path="/info" element={<Outlet />}>
                        <Route index element={<About/>} />
                        <Route path="rules" element={<Rules/>} />
                    </Route>

                    <Route path="/grades" element={<Outlet />}>
                        <Route index element={<Grades/>} />
                        <Route path="add" element={<AddGrade/>} />
                    </Route>

                    <Route path="/lprcup" element={<Outlet />}>
                        <Route index element={<LprCup/>} />
                        <Route path="submission" element={<LprCupSubmission/>} />
                    </Route>

                    // 404
                    <Route path="/404" element={<NotFound/>} />
                    <Route path="*" element={<Navigate to="/404"/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}