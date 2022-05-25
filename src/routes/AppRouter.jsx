import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mint from "../pages/Mint";
import Refer from "../pages/Refer";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Mint/>}/>
                <Route path='/refer' element={<Refer/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;