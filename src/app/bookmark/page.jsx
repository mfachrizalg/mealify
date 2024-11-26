"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import BookmarkCard from "../components/BookmarkCard";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import CalendarModal from "../components/CalendarModal";
import DetailRecipe from "../components/DetailRecipe";

const dummyRecipes = [
  {
    id: 1,
    name: "Seafood Fried Rice",
    ingredients: "Shrimp, Egg, Rice",
    image:
      "https://www.aheadofthyme.com/wp-content/uploads/2020/04/10-minute-seafood-fried-rice-6.jpg",
  },
  {
    id: 2,
    name: "Sausage Fried Rice",
    ingredients: "Sausage, Egg, Rice",
    image:
      "https://www.seriouseats.com/thmb/jsfvb5RyxampT3ZdqOgZTEV4j88=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/stir-fried-rice-with-chinese-sausage-recipe-hero-03_1-96ea47b756444693ae3cbd60ec7afe02.JPG",
  },
];

export default function RecipePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const totalPages = Math.ceil(dummyRecipes.length / recipesPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState(dummyRecipes); // State untuk bookmark

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeCalendarModal = () => setIsCalendarModalOpen(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    setIsCalendarModalOpen(true);
  };

  const handleSave = (date) => {
    console.log(
      `Recipe "${selectedRecipe.name}" scheduled on ${date.toDateString()}`
    );
    setIsCalendarModalOpen(false);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeDetail = () => {
    setSelectedRecipe(null);
  };

  const handleRemoveBookmark = (id) => {
    setBookmarkedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col gap-6 p-6">
        {/* Halaman Detail */}
        {selectedRecipe && (
          <div className="p-4 mt-6 bg-orange-100 rounded-md shadow-md w-4/5 mx-auto">
            <DetailRecipe recipe={selectedRecipe} onClose={closeDetail} />
          </div>
        )}

        {/* Halaman Bookmark */}
        <div className="p-6 mt-3">
          {bookmarkedRecipes.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              There's no menu here
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {bookmarkedRecipes.map((recipe) => (
                <div key={recipe.id}>
                  <BookmarkCard
                    recipe={recipe}
                    isBookmarkPage={true} // Menandai ini halaman bookmark
                    onRemoveBookmark={() => handleRemoveBookmark(recipe.id)}
                  />
                </div>
              ))}
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
          />
          <CalendarModal
            isOpen={isCalendarModalOpen}
            onClose={closeCalendarModal}
            onSave={handleSave}
            recipe={selectedRecipe}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
}
