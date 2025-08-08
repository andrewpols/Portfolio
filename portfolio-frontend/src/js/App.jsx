import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Resume from "./Resume.jsx";
import Contact from "./Contact.jsx";


import '../styles/App.css';

function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Home />} />

                    <Route path="Resume" element={<Resume />} />

                    <Route path="contact" element={<Contact />}/>

                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default function App() {
    return (
        <>
            <MainRoutes/>
        </>
    )
}
