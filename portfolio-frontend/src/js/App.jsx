import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Resume from "./Resume.jsx";
import NotFound from "./NotFound.jsx";


import '../styles/App.css';

function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Home />} />

                    {/* Old page URLs keep working: they land on the matching section of Home. */}
                    <Route path="work" element={<Navigate to={{ pathname: "/", hash: "#experiences-section" }} replace />} />

                    <Route path="resume" element={<Resume />} />

                    <Route path="contact" element={<Navigate to={{ pathname: "/", hash: "#contact-section" }} replace />} />

                    <Route path="*" element={<NotFound />} />
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
