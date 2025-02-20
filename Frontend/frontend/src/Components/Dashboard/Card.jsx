const Card = ({ title, value, icon }) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center">
          <span className="p-3 bg-purple-100 text-purple-600 rounded-full">{icon}</span>
          <div className="ml-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  