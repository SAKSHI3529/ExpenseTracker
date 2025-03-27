import { useState, useEffect } from "react";
import Alert from "../ui/Alert";

const Form = ({ initialFormData, title, fields, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  useEffect(() => {
    const now = new Date();
    setFormData((prevData) => ({
      ...prevData,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0].slice(0, 5),
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setAlert({ show: true, type: "success", message: `Added successfully!` });
      setFormData(initialFormData);
    } catch (error) {
        console.log(error)
      setAlert({ show: true, type: "error", message: "Error submitting form." });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ show: false })} />}
      <div className="p-10   dark:text-gray-100 shadow-md rounded-lg lg:w-[700px] rounded-2xl border border-gray-200 bg-gray-800 dark:border-gray-800 ">
       <div className=" py-5">
        <h2 className="font-bold text-2xl dark:text-white mb-4">{title}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col mb-4">
              <label className="text-base mb-1 ">{field.label}</label>
              {field.type === "select" ? (
                <select name={field.name} value={formData[field.name]} onChange={handleChange} required className="w-full p-2 border rounded hover:bg-gray-600">
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value} className="">{option.label} &nbsp;&nbsp; {option.amt}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} required className="w-full p-2 border rounded" placeholder={field.placeholder || ""} />
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-300 text-white px-4 py-2 rounded w-full hover:bg-blue-500 transition">{title}</button>
        </form>
      </div>
    </>
  );
};

export default Form;
