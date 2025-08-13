import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/homePage';
import PublicSuggestionPage from './pages/publicSuggestionPage';
import SubscribeUserPage from './pages/SubscribeUserPage';
import Profile from './pages/adminProfilePage';
import WeatherPage from "./pages/weatherPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/suggestion" element={<PublicSuggestionPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/weather" element={<WeatherPage/>}/>
                <Route path="*" element={<div>404 Not Found</div>}/>
                <Route path="/subscribePrediction" element={<SubscribeUserPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
