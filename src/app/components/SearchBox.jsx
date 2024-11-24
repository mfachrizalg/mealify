import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox() {
  return (
    <div
      className="
      top-56
      w-full
      h-full
      max-w-xl
      flex
      items-center
      z-10"
    >
      <input
        type="text"
        placeholder="Search Your Recipe..."
        className="z-10 w-full px-10 pr-20 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus-within:text-black focus:ring-orange-500"
      />
      <MagnifyingGlassIcon className="z-10 absolute top-auto left-3 w-6 h-6 text-gray-500 " />
      <button className="z-10 absolute right-2 bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition">
        Find Recipe
      </button>
    </div>
  );
}
