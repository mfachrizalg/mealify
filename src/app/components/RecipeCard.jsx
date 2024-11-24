import Image from "next/image";

export default function RecipeCard({ recipe }) {
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
          <br /> {recipe.ingredients}
        </p>
      </div>
    </div>
  );
}
