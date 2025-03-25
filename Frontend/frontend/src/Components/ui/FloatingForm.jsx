import { useState } from "react";

const FloatingForm = ({ title, initialFormData, fields, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIconSelect = (icon) => {
    setFormData({ ...formData, icon });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm text-yellow-400 mb-1">{field.label}</label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-900 text-yellow-300 border border-gray-600 rounded-lg"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "icon" ? (
                <div className="grid grid-cols-4 gap-3 p-2 bg-gray-900 border border-gray-600 rounded-lg">
                  {Object.keys(field.iconMap).map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      className={`p-2 rounded-lg ${formData.icon === iconName ? "bg-yellow-500" : "bg-gray-700"} hover:bg-yellow-400`}
                      onClick={() => handleIconSelect(iconName)}
                    >
                      {field.iconMap[iconName]}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-900 text-yellow-300 border border-gray-600 rounded-lg"
                  placeholder={field.placeholder || ""}
                />
              )}
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600">
              CANCEL
            </button>
            <button type="submit" className="bg-yellow-500 p-2 rounded-lg text-gray-900 font-bold hover:bg-yellow-400">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FloatingForm;
