import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Signinbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-orange-500 z-20 relative">
      <div className="flex items-center space-x-2">
        <Image src={Logo} alt="Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-white">Mealify</span>
      </div>

      <button className="px-4 py-2 bg-orange-300 text-white font-semibold rounded-md hover:bg-orange-400">
                    SIGN IN
      </button>
    </header>
  );
}