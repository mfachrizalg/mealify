"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import DetailRecipe from "../components/DetailRecipe";
import { useSearchParams } from "next/navigation";

function RecipeContent() {
  const searchParams = useSearchParams(); // Hook to access query parameters
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]); // State for search results
  const recipesPerPage = 4;

  useEffect(() => {
    // Get the 'search' query parameter
    const query = searchParams.get("search");
    if (query) {
      handleSearch(query); // Fetch recipes using the query parameter
    }
  }, [searchParams]);

  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://backend-paw-delta.vercel.app/api/meal?name=${query}`
      );
      setRecipes(response.data || []); // Set search results
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="relative top-5 mx-auto w-full h-full max-w-xl flex items-center z-10">
        <SearchBox onSearch={handleSearch} />
      </div>

      {selectedRecipe && (
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

      {/* Recipe Cards */}
      <div className="p-6 mt-3">
        <div className="grid grid-cols-4 gap-4">
          {currentRecipes.map((recipe) =>
            recipe.mealDBid === selectedRecipe?.mealDBid ? null : (
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default function RecipePage() {
  return (
    <Layout>
      <Navbar />
      <Suspense fallback={<div>Loading recipes...</div>}>
        <RecipeContent />
      </Suspense>
    </Layout>
  );
}
