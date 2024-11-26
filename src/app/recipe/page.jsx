"use client";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
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

  const currentRecipes = dummyRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query) => {
    if (!query) return;
    try {
      console.log(
        `https://backend-paw-delta.vercel.app/api/meal?name=${query}`
      );
      const response = await axios.get(
        `https://backend-paw-delta.vercel.app/api/meal?name=${query}`
      );
      console.log(response);
      setRecipes(response.data || []); // Set hasil pencarian, default ke array kosong jika tidak ada hasil
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
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

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col gap-6 p-6">
        {/* Search Box */}
        <div className="relative top-5 mx-auto w-full h-full max-w-xl flex items-center z-10">
          <SearchBox />
        </div>

        {/* Detail Recipe */}
        {selectedRecipe && (

          <div className="p-4 mt-6 bg-orange-100 rounded-md shadow-md w-full md:w-4/5 mx-auto">
            <DetailRecipe recipe={selectedRecipe} onClose={closeDetail} />
          
          <div className="p-4 mt-6 bg-orange-100 rounded-md shadow-md w-4/5 mx-auto">
            <DetailRecipe
              recipe={{
                idMeal: selectedRecipe.mealDBid,
                name: selectedRecipe.name,
                image: selectedRecipe.image,
                ingredients: selectedRecipe.ingredients,
              }}
              onClose={closeDetail}
            />

          </div>
        )}

        {/* Daftar Recipe Cards */}
        <div className="p-6 mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentRecipes.map((recipe) =>

              recipe.mealDBid === selectedRecipe?.mealDBid ? null : ( // Hanya sembunyikan kartu yang dipilih
                <div
                  key={recipe.mealDBid}
                  onClick={() => handleRecipeClick(recipe)}
                  className="cursor-pointer"
                >
                  <RecipeCard
                    recipe={{
                      idMeal: recipe.mealDBid,
                      name: recipe.name,
                      image: recipe.image,
                      ingredients: recipe.ingredients,
                    }}
                  />
                </div>
              )
            )}
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
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
