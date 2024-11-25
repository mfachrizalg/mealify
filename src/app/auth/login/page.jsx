import Head from "next/head";
import Image from "next/image";
import Logo from "../../../../public/images/logo.svg";
import food3 from "../../../../public/images/food3.svg";
import Layout from "../../components/Layout";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>

      <Image
        src={food3} width={200} height={200} 
        alt="food"
        className="absolute bottom-0 left-0"
      />

      <main className="flex flex-col items-center justify-center w-full px-6 sm:px-10 py-28 text-center">

        <div className="relative z-10" style={{ marginBottom: "-1.5rem" }}>
            <h1 
            className="text-4xl font-bold text-white bg-[#F1D6A9]/75 px-8 py-2 rounded-lg shadow-lg"
            style={{ fontFamily: 'Poppins' }}
            >
            SIGN IN
            </h1>
        </div>

        <div className="bg-[#F5682C]/75 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full sm:w-3/4 max-w-2xl py-10 px-10">
            
            {/* Logo Section */}
            <div className="w-full sm:w-1/3 p-5 flex justify-center items-center">
              <Image src={Logo} width={200} height={200} alt="Mealify" />
            </div>

            {/* SignUp Section */}
            <div className="w-full sm:w-2/3 p-5">
            <div className="flex flex-col items-center">
              {/* Form Fields */}
              {['Email', 'Password'].map((label, index) => (
                <div key={index} className="mb-3 w-full sm:w-5/6">
                  <p className="text-[#FFFFF5] text-left font-bold mb-1">{label}</p>
                  <div className="bg-[#FFFFF5] p-1 sm:p-2 flex items-center rounded-md">
                    <input
                      type={label === 'Password' ? 'password' : 'text'}
                      name={label.toLowerCase().replace(" ", "_")}
                      className="bg-[#FFFFF5] outline-none text-sm flex-1 p-1 text-black"
                    />
                  </div>
                </div>
              ))}

                <button className="bg-black hover:bg-[#F1D6A9]
                text-[#FFFFF5] font-bold py-2 px-6 mt-4 rounded-lg w-full sm:w-5/6"
                    type="submit">
                  Register
                </button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
  );
}