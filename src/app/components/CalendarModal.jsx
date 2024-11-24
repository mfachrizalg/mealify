import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarModal = ({ isOpen, onClose, onSave, recipe }) => {
  const [date, setDate] = useState(new Date());

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(date);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-black text-lg font-semibold text-center mb-4">
          Select a date to add "{recipe?.name}" to your schedule
        </h2>
        <div className="mb-4">
          <Calendar onChange={setDate} value={date} className="text-black" />
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white px-6 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
