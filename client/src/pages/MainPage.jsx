import { useEffect, useState } from "react";
import MainList from "../components/MainList";
import axios from "axios";

const MainPage = () => {
  const [buddy, setBuddy] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setBuddy(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch buddies:", error);
      });
  }, []);

  return (
    <div className="main-page px-4 md:px-8 py-8">
      <MainList buddies={buddy} onItemClick={(buddy) => {}} />
    </div>
  );
};

export default MainPage;
