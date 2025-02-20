import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 p-4 flex-shrink-0">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Windmill</h2>
      <ul className="mt-6 space-y-2">
        <li>
          <Link className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md" to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md" to="/forms">
            Forms
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
