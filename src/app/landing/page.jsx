import Image from "next/image";
import Signinbar from "../components/Signinbar";
import food5 from "../../../public/images/food5.svg";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <Layout>
      {/* Header */}
      <Navbar />
      {/*<Signinbar />*/}
      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-between mx-auto p-10 max-w-6xl">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col z-10 pt-20 lg:pt-32">
          <div className="max-w-xl">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-orange-600 mb-6 leading-tight"
              style={{ fontFamily: "Poppins" }}
            >
              PLAN YOUR
              <br />
              MEAL !
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              No more guesswork for tomorrow's meals!
            </p>
            <div className="flex w-full">
              <input
                type="text"
                placeholder=""
                className="p-4 rounded-l-md border border-gray-300 flex-1 focus-within:text-black focus:ring-orange-500"
              />
              <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-r-md hover:bg-orange-600 transition-colors">
                Get started
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-20 lg:mt-16 absolute inset-y-0 right-0">
          <Image src={food5} alt="Mealboxes" width={475} height={300} />
        </div>
      </main>
    </Layout>
  );
}
