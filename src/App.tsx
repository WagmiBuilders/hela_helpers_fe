import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import PublicSuggestionPage from './pages/publicSuggestionPage';
import SubscribeUserPage from './pages/SubscribeUserPage';
import Profile from './pages/adminProfilePage';

function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/suggestion" element={<PublicSuggestionPage/>} />
        <Route path="/subscribePrediction" element={<SubscribeUserPage/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
