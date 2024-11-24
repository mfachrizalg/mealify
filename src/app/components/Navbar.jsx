import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-orange-500 z-20 relative">
      <div className="flex items-center space-x-2">
        <Image src={Logo} alt="Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-white">Mealify</span>
      </div>
      <nav className="flex mr-10 space-x-8 text-white font-medium">
        <a href="recipe" className="hover:underline">
          Resep
        </a>
        <a href="#" className="hover:underline">
          Jadwal
        </a>
        <a href="#" className="hover:underline">
          Bookmark
        </a>
      </nav>
      <div className="flex items-center space-x-2 text-black rounded-full bg-white p-2">
        <span>Jally</span>
        <UserCircleIcon className="w-8 h-8 rounded-full bg-orange-300" />
      </div>
    </header>
  );
}
