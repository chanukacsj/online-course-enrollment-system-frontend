import './App.css';
import { Route, Routes} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import {Login} from "./view/pages/Login/Login.tsx";
import {Register} from "./view/pages/Registar/Register.tsx";
function App() {
    return(
            <Routes>
                <Route path="/*" element={<DefaultLayout />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
    );
}
export default App;