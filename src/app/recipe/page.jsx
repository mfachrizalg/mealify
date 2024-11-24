"use client";
import React from "react";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useState } from "react";

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
  // Tambahkan data lainnya untuk simulasi
];

export default function RecipePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  // Hitung total halaman
  const totalPages = Math.ceil(dummyRecipes.length / recipesPerPage);

  // Data untuk halaman saat ini
  const currentRecipes = dummyRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col">
        <div className="relative top-5 mx-auto w-full h-full max-w-xl flex items-center z-10">
          <SearchBox />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mt-6">
            {currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
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
