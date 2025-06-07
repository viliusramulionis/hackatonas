import './App.css';
import MainPage from './pages/MainPage';
import BuddyCardDetailed from './components/BuddyCardDetailed';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { EditProfile } from './pages/EditProfile';

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Router>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budies/:id" element={<BuddyCardDetailed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit/profile/:id" element={<EditProfile />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
