import { useState } from "react";
import Image from "next/image";

export default function RecipeCard({ recipe }) {
  // State to manage whether to show full ingredients or not
  const [isExpanded, setIsExpanded] = useState(false);

  // Set a maximum length for the ingredients to display
  const maxLength = 100; // Adjust this value as needed

  // Truncate ingredients if they exceed the maximum length
  const displayIngredients = isExpanded
    ? recipe.ingredients.join(", ")
    : recipe.ingredients.length > maxLength
    ? recipe.ingredients.slice(0, maxLength) + "..."
    : recipe.ingredients.join(", ");

  return (
    <div className="bg-[#F4854D] shadow-md rounded-lg flex flex-col w-[300px] h-[400px]">
      <div className="flex justify-center items-center p-4 h-[60%]">
        {/* Flexbox container untuk gambar */}
        <Image
          src={recipe.image}
          alt={recipe.name}
          className="rounded-t-lg object-cover"
          width={300}
          height={200} // Sesuaikan tinggi gambar agar seragam
        />
      </div>

      <div className="bg-white py-3 px-4 rounded-b-lg flex-grow">
        {/* Konten ini akan selalu berada di bawah */}
        <h2 className="text-lg font-bold mt-2 text-center text-black">
          {recipe.name}
        </h2>
        <p className="text-base text-gray-800">
          Ingredient:
          <br /> {displayIngredients}
        </p>

        {/* Toggle button for showing more/less */}
        {recipe.ingredients.length > maxLength && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 mt-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
}
