import React, { useState } from "react";
import Modal from "./Modal"; // Impor Modal komponen
import CalendarModal from "./CalendarModal"; // Impor CalendarModal komponen

export default function DetailRecipe({ recipe, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fungsi untuk membuka modal konfirmasi
  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal konfirmasi
  const closeModal = () => setIsModalOpen(false);

  // Fungsi untuk menutup modal kalender
  const closeCalendarModal = () => setIsCalendarModalOpen(false);

  // Fungsi yang dijalankan saat pengguna mengonfirmasi untuk menambahkan ke jadwal
  const handleConfirm = () => {
    setIsModalOpen(false); // Menutup modal konfirmasi
    setIsCalendarModalOpen(true); // Membuka modal kalender
  };

  // Fungsi untuk menyimpan tanggal yang dipilih
  const handleSave = (date) => {
    console.log(
      `Recipe "${selectedRecipe.name}" scheduled on ${date.toDateString()}`
    );
    setIsCalendarModalOpen(false); // Menutup modal kalender
  };

  if (!recipe) return null;

  return (
    <div className="p-4 bg-orange-200 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">{recipe.name}</h2>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Close
        </button>
      </div>
      <div className="flex mt-4">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-1/3 rounded-md shadow-md"
        />
        <div className="ml-6">
          <h3 className="text-lg font-semibold text-black">Ingredients:</h3>
          <ul className="list-disc ml-4 text-black">
            {Array.isArray(recipe.ingredients) &&
            recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={`${index}+0`}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Button to open modal */}
      <button
        onClick={() => openModal(recipe)} // Open modal on click
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Add to Schedule
      </button>

      {/* Modal component for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />

      {/* Calendar modal component */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={closeCalendarModal}
        onSave={handleSave}
        recipe={selectedRecipe}
      />
    </div>
  );
}
