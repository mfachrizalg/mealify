import React from "react";

export default function DetailRecipe({ recipe, onClose }) {
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
            {recipe.ingredients.split(", ").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
