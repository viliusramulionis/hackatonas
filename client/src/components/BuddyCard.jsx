const BuddyCard = ({ buddy, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group rounded-2xl bg-[#f3f4f6] dark:bg-[#1f2937] shadow hover:shadow-lg transition-all duration-300 p-6 cursor-pointer text-center hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
    >
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-600">
        <img
          src={buddy.image || "https://via.placeholder.com/150"}
          alt={buddy.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
        {buddy.name}
      </h3>
    </div>
  );
};

export default BuddyCard;
