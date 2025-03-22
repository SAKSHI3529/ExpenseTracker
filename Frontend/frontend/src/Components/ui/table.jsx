
import PropTypes from "prop-types";

export const Table = ({ children, className }) => {
  return <table className={`w-full border-collapse ${className}`}>{children}</table>;
};

export const TableHeader = ({ children }) => {
  return <thead className="bg-gray-200 dark:bg-[#9CB9FF]">{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody className="divide-y">{children}</tbody>;
};

export const TableRow = ({ children }) => {
  return <tr className="hover:bg-gray-700 dark:hover:bg-[#9CB9FF]">{children}</tr>;
};

export const TableHead = ({ children }) => {
  return <th className="p-2 text-left border dark:border-gray-600">{children}</th>;
};

export const TableCell = ({ children }) => {
  return <td className="p-2 border dark:border-gray-600">{children}</td>;
};

// ✅ Add PropTypes Validation for Each Component
Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
};
