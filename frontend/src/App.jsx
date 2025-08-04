import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Read from "../pages/Read";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Login from '../pages/Login';
import AuditTrail from "../pages/AuditTrail";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/create' element={<Create/>}></Route>
                <Route path='/edit/:studentId' element={<Edit/>}></Route>
                <Route path='/read/:studentId' element={<Read/>}></Route>
                <Route path='/audit-trail' element={<AuditTrail/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App