"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker"; // Import TimePicker
import "react-time-picker/dist/TimePicker.css";

const CalendarModal = ({ isOpen, onClose, onSave, recipe }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("12:00"); // Default time

  if (!isOpen) return null;

  const handleSave = () => {
    // Combine date and time
    const [hours, minutes] = time.split(":").map(Number);
    const fullDate = new Date(date);
    fullDate.setHours(hours, minutes);

    onSave(fullDate); // Pass combined date and time
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-black text-lg font-semibold text-center mb-4">
          Select a date and time to add "{recipe?.name}" to your schedule
        </h2>
        <div className="mb-4">
          <Calendar onChange={setDate} value={date} className="text-black" />
        </div>
        <div className="mb-4">
          <TimePicker
            onChange={setTime}
            value={time}
            disableClock={true}
            className="w-full text-black border border-gray-300 rounded-md p-2"
          />
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
