"use client";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import CalendarModal from "../components/CalendarModal";

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

  const currentRecipes = dummyRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col">
        <div className="relative top-5 mx-auto w-full h-full max-w-xl flex items-center z-10">
          <SearchBox />
        </div>
        <div className="p-6 mt-3">
          <div className="grid grid-cols-4">
            {currentRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => openModal(recipe)}
                className="cursor-pointer"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
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
