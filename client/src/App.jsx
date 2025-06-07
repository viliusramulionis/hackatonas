import "./App.css";
import MainPage from "./pages/MainPage";
import BuddyCardDetailed from "./components/BuddyCardDetailed";
import Navigation from "./components/Navigation";
import Register from "./pages/Register";
import { EditProfile } from "./pages/EditProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budies/:id" element={<BuddyCardDetailed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/profile/:id" element={<EditProfile />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
