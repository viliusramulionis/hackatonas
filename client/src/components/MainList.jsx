import { useNavigate } from "react-router-dom";
import BuddyCard from "./BuddyCard";

const MainList = ({ buddies }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/budies/${id}`);
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {buddies.map((buddy) => (
        <BuddyCard
          key={buddy.id}
          buddy={buddy}
          onClick={() => handleClick(buddy.id)}
        />
      ))}
    </section>
  );
};

export default MainList;
