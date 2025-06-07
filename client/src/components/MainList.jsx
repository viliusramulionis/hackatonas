const MainList = ({ buddies, onBuddyClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {buddies.map((buddy, index) => (
        <div
          key={index}
          onClick={() => onBuddyClick(buddy)}
          className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer text-center hover:-translate-y-1"
        >
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
            <img
              src={buddy.image}
              alt={buddy.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
            {buddy.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {buddy.role || "User"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MainList;