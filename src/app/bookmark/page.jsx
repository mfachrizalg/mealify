"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import BookmarkCard from "../components/BookmarkCard";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import CalendarModal from "../components/CalendarModal";
import DetailRecipe from "../components/DetailRecipe";
import Cookies from "js-cookie";
import axios from "axios";

export default function RecipePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]); // State untuk menyimpan bookmark dari API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data bookmark dari API
  useEffect(() => {
    const token = Cookies.get("mealify");
    if (!token) {
      router.push("/landing");
    } else {
      const fetchBookmarks = async () => {
        try {
          const response = await axios.get(
            "https://backend-paw-delta.vercel.app/api/meal/bookmark",
            {
              headers: {
                "Content-Type": "application/json",
                cookie: `mealify=${Cookies.get("mealify")}`, // Correctly pass the cookie here
                Authorization: `Bearer ${Cookies.get("mealify")}`,
              },
              withCredentials: true,
            }
          );

          const data = response.data;
          setBookmarkedRecipes(data); // Update state dengan data dari API
          setLoading(false);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
          setError(error.message);
          setLoading(false);
        }
      };
      console.log("Auth Token", Cookies.get("token"));

      fetchBookmarks();
    }
  }, []);

  const totalPages = Math.ceil(bookmarkedRecipes.length / recipesPerPage);

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

  const handleRemoveBookmark = async (id) => {
    try {
      // Display loading indicator while processing the request
      setLoading(true);

      // Send DELETE request to the API
      await axios.delete(
        `https://backend-paw-delta.vercel.app/api/meal/bookmark/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("mealify")}`, // Include token correctly
          },
          withCredentials: true,
        }
      );

      // Update bookmarked recipes after successful deletion
      setBookmarkedRecipes((prev) =>
        prev.filter((recipe) => recipe.mealDBid !== id)
      );
    } catch (error) {
      console.error("Error removing bookmark:", error);

      // Display error message to the user if needed
      setError("Failed to remove the bookmark. Please try again.");
    } finally {
      // Stop the loading indicator once the operation is complete
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Navbar />
        <div className="text-center text-lg">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Navbar />
        <div className="text-center text-red-500">{error}</div>
      </Layout>
    );
  }

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
                <div key={recipe.mealDBid}>
                  <BookmarkCard
                    recipe={recipe}
                    isBookmarkPage={true} // Menandai ini halaman bookmark
                    onRemoveBookmark={() =>
                      handleRemoveBookmark(recipe.mealDBid)
                    }
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
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
}
