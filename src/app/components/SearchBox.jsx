import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox() {
  return (
    <div className="w-full max-w-xl px-4 md:px-0">
      <div className="flex items-center w-full bg-white shadow-md rounded-full overflow-hidden">
        {/* Icon Magnifying Glass */}
        <div className="flex items-center justify-center px-3">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search Your Recipe..."
          className="flex-1 px-2 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="justify-center items-center px-1">
          {/* Button */}
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition">
            Find Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
