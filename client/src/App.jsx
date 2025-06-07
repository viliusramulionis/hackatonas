import "./App.css";
import MainPage from "./pages/MainPage";
import BuddyCardDetailed from "./components/BuddyCardDetailed";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budies/:id" element={<BuddyCardDetailed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/profile/:id" element={<EditProfile />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
