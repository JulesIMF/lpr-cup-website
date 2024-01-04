import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {Grades} from "./grades";
import {NotFound} from "./notfound";
import "./style.css";
import {Welcome} from "./welcome";
import {SignUp} from './signup';
import {LogIn} from './login';
import {About, Rules} from './about';
import {Restoration} from './restoration';
import {LprCup} from './lprcup';
import {LprCupSubmission} from './submission';
import {whoAmI, whoAmITerminated} from '../../server/server';
import {AddEpisode, AddSeasons} from "./add";

export function App() {
    whoAmI();
    var [loaded, updateLoaded] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            if (whoAmITerminated()) {
                updateLoaded(true);
                clearInterval(interval);
            }
        }, 100/*ms*/);
    }, []);
    return loaded ? (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/grades" element={<Grades/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<LogIn/>}/>
                    <Route path="/restoration" element={<Restoration/>}/>

                    <Route path="/info" element={<Outlet/>}>
                        <Route index element={<About/>}/>
                        <Route path="rules" element={<Rules/>}/>
                    </Route>

                    <Route path="/grades" element={<Outlet/>}>
                        <Route index element={<Grades/>}/>
                        <Route path="add" element={<AddSeasons/>}/>
                    </Route>

                    <Route path="/lprcup" element={<Outlet/>}>
                        <Route index element={<LprCup/>}/>
                        <Route path="submission" element={<LprCupSubmission/>}/>
                        <Route path="add" element={<AddEpisode/>}/>
                    </Route>

                    // 404
                    <Route path="/404" element={<NotFound/>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    ) : <></>;
}