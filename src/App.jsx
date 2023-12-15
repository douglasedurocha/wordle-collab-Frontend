import Home from "./components/pages/Home";
import LoginSignup from "./components/auth/LoginSignup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;