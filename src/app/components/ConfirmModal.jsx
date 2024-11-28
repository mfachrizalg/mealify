import { useRouter } from "next/navigation";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, route }) => {
  const router = useRouter(); // Use Next.js router for navigation

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // Execute the provided confirm callback
    if (route) router.push(route); // Navigate to the route if provided
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-orange-500 rounded-lg p-8 w-96">
        <h2 className="text-white text-lg font-semibold text-center mb-4">
          {message}{" "}
        </h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleConfirm} // Call the handleConfirm function
            className=" bg-yellow-300 text-black px-6 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
