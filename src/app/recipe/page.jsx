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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]); // State untuk menyimpan hasil pencarian
  const recipesPerPage = 4;

  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setRecipes(data.meals || []); // Set hasil pencarian, default ke array kosong jika tidak ada hasil
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
            {currentRecipes.map(
              (
                recipe // Use currentRecipes instead of recipes
              ) =>
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
