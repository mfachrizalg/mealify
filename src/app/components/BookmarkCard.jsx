import React from "react";
import Image from "next/image";

export default function BookmarkCard({
  recipe,
  onRemoveBookmark,
  isBookmarkPage,
}) {
  return (
    <div className="bg-[#F4854D] shadow-md rounded-lg flex flex-col w-[300px] h-[400px]">
      {/* Gambar Resep */}
      <div className="flex justify-center items-center p-4 h-[60%]">
        <Image
          src={recipe.image}
          alt={recipe.name}
          className="rounded-t-lg object-cover"
          width={300}
          height={200}
        />
      </div>

      {/* Konten Resep */}
      <div className="bg-white py-3 px-4 rounded-b-lg flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-lg font-bold mt-2 text-center text-black">
            {recipe.name}
          </h2>
          <p className="text-base text-gray-800 mt-2">
            Ingredient:
            <br /> {recipe.ingredients}
          </p>
        </div>
        {isBookmarkPage && ( // Tampilkan tombol hanya di halaman bookmark
          <button
            onClick={onRemoveBookmark}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Hapus dari Bookmark
          </button>
        )}
      </div>
    </div>
  );
}
