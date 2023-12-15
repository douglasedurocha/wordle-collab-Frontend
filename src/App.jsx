import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./components/pages/Home";
import LoginSignup from "./components/auth/LoginSignup";


function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginSignup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;