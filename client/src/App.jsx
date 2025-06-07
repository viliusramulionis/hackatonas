import "./App.css";
import MainPage from "./pages/MainPage";
import BuddyCardDetailed from "./components/BuddyCardDetailed";
import Navigation from "./components/Navigation";
<<<<<<< HEAD
=======
import Register from "./pages/Register";
<<<<<<< HEAD
import { EditProfile } from "./pages/EditProfile";
=======
>>>>>>> 3eb94db0b58fce91cb6759633d463e6c7650cd6f
>>>>>>> d268811a9a490a87237241cd15ec1a5d752f2a1d
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budies/:id" element={<BuddyCardDetailed />} />
<<<<<<< HEAD
=======
            <Route path="/register" element={<Register />} />
<<<<<<< HEAD
            <Route path="/edit/profile/:id" element={<EditProfile />} />
=======
>>>>>>> 3eb94db0b58fce91cb6759633d463e6c7650cd6f
>>>>>>> d268811a9a490a87237241cd15ec1a5d752f2a1d
          </Routes>
      </Router>
    </div>
  );
}

export default App;
