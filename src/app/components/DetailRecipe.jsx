import React, { useState } from "react";
import Modal from "./Modal"; // Impor Modal komponen
import CalendarModal from "./CalendarModal"; // Impor CalendarModal komponen
import axios from "axios"; // Impor axios
import Cookies from "js-cookie"; // Impor Cookies

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
  const handleSave = async (fullDate) => {
    console.log(
      `Recipe "${selectedRecipe.name}" (${
        selectedRecipe.idMeal
      }) scheduled on ${fullDate.toISOString()}`
    );
    try {
      if (!selectedRecipe) {
        throw new Error("No recipe selected.");
      }

      // Menyiapkan payload
      const payload = {
        mealDBid: selectedRecipe.idMeal,
        startDate: fullDate.toISOString(), // Format tanggal ISO
      };

      console.log("Payload to be sent:", payload);

      // Memanggil API
      const response = await axios.post(
        "https://backend-paw-delta.vercel.app/api/meal/schedule",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            //Cookie: `mealify=${Cookies.get("mealify")}`, // Correctly pass the cookie here
            Authorization: `Bearer ${Cookies.get("mealify")}`,
          },
          withCredentials: true,
        }
      );

      const data = await response.data;
      console.log("Recipe scheduled successfully:", data);
      alert(
        `Recipe "${
          selectedRecipe.name
        }" scheduled on ${fullDate.toDateString()}`
      );
    } catch (error) {
      console.error("Error scheduling the recipe:", error);
      alert("Failed to schedule the recipe. Please try again.");
    } finally {
      setIsCalendarModalOpen(false); // Menutup modal kalender
    }
  };

  // Fungsi untuk menambahkan ke bookmark
  const addToBookmark = async (mealDBid) => {
    try {
      const response = await fetch(
        `https://backend-paw-delta.vercel.app/api/meal/bookmark/${mealDBid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `mealify=${Cookies.get("mealify")}`, // Correctly pass the cookie here
            Authorization: `Bearer ${Cookies.get("mealify")}`, // Add token if required
          },
          withCredentials: true,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to bookmark the recipe");
      }

      const data = await response.json();
      console.log("Recipe bookmarked successfully:", data);
      alert("Recipe successfully added to bookmarks!");
    } catch (error) {
      console.error("Error bookmarking the recipe:", error);
      alert("Failed to add recipe to bookmarks.");
    }
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
      <div className="flex flex-row gap-10">
        <button
          onClick={() => openModal(recipe)} // Open modal on click
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Add to Schedule
        </button>
        <button
          onClick={() => addToBookmark(recipe.idMeal)} // Call API on click
          className="mt-4 bg-white text-blue-500 px-6 py-2 rounded-md"
        >
          Add to Bookmark
        </button>
      </div>

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
