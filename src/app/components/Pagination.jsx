import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <ArrowLeftIcon
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} // Add onClick logic
        className={`w-5 h-5 text-black ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      />
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-black rounded disabled:text-gray-500"
      >
        Previous
      </button>
      <p className="text-black">
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-black rounded disabled:text-gray-500"
      >
        Next
      </button>
      <ArrowRightIcon
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        } // Add onClick logic
        className={`w-5 h-5 text-black ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      />
    </div>
  );
}
