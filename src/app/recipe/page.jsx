"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import CalendarModal from "../components/CalendarModal";
import DetailRecipe from "../components/DetailRecipe";

export default function RecipePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]); // State untuk menyimpan hasil pencarian
  const recipesPerPage = 4;

  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://backend-paw-delta.vercel.app/api/meal/?name=${query}`
      );
      setRecipes(response.data.meals || []); // Set hasil pencarian, default ke array kosong jika tidak ada hasil
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Modal

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
        <div className="relative top-5 mx-auto w-full h-full max-w-xl flex items-center z-10">
          <SearchBox onSearch={handleSearch} />
        </div>

        {selectedRecipe && (
          <div className="p-4 mt-6 bg-orange-100 rounded-md shadow-md w-4/5 mx-auto">
            <DetailRecipe
              recipe={{
                idMeal: selectedRecipe.idMeal,
                name: selectedRecipe.strMeal,
                image: selectedRecipe.strMealThumb,
                ingredients: selectedRecipe.strIngredient1,
              }}
              onClose={closeDetail}
            />
          </div>
        )}

        {/* Daftar Recipe Cards */}
        <div className="p-6 mt-3">
          <div className="grid grid-cols-4 gap-4">
            {currentRecipes.map((recipe) =>
              recipe.idMeal === selectedRecipe?.idMeal ? null : ( // Hanya sembunyikan kartu yang dipilih
                <div
                  key={recipe.idMeal}
                  onClick={() => handleRecipeClick(recipe)}
                  className="cursor-pointer"
                >
                  <RecipeCard
                    recipe={{
                      idMeal: recipe.idMeal,
                      name: recipe.strMeal,
                      image: recipe.strMealThumb,
                      ingredients: recipe.strIngredient1,
                    }}
                  />
                </div>
              )
            )}
          </div>
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
