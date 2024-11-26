import Image from "next/image";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import food1 from "../../../public/images/food1.svg";
import food2 from "../../../public/images/food2.svg";
import food3 from "../../../public/images/food3.svg";
import food4 from "../../../public/images/food4.svg";
import dotted from "../../../public/images/dotted.svg";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center py-20 ">
        {/* Background images */}
        <Image
          src={food1}
          alt="Food"
          className="absolute flex-auto sm:-top-52 md:top-30 -left-10 w-25 h-auto z-0 overflow-hidden"
          priority={true}
          quality={1}
          loading="eager"
        />

        <Image
          src={food2}
          alt="Food"
          className="absolute flex-auto top-30 -right-64 w-25 h-auto z-0 hidden md:block"
          priority={true}
          loading="eager"
          quality={1}
        />

        <Image
          src={food3}
          alt="Food"
          className="absolute flex-auto top-96 -bottom-72 -left-10 w-auto h-72 z-0 overflow-hidden hidden md:block"
          loading="eager"
          quality={1}
        />

        <Image
          src={food4}
          alt="Food"
          className="absolute flex top-72 -right-64 w-25 h-auto z-0 overflow-hidden"
          loading="eager"
          quality={1}
        />

        {/* Search Box */}
        <div className="absolute top-56 w-full h-full max-w-xl flex items-center z-10">
          <SearchBox className="z-10" />
          <div className="absolute -z-10 left-[-72px] top-10 transform -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle, #E5E7EB 1px, transparent 1px)] bg-[length:10px_10px]">
            <Image src={dotted} alt="dotted image" />
          </div>
          <div className="absolute -z-10 right-[-72px] top-auto -bottom-40 transform -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle, #E5E7EB 1px, transparent 1px)] bg-[length:10px_10px] scale-x-[-1]">
            <Image src={dotted} alt="dotted image" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
