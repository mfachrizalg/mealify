"use client";
import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi
import axios from "axios"; // Import axios

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cXmhIfEx0QHxbf1x0ZFRGal5WTndbUiweQnxTdEFiWH1bcXRWRmNVWUN1Xw=="
);

const SchedulerPage = () => {
  const router = useRouter(); // Inisialisasi useRouter
  const [recipeScheduleData, setRecipeScheduleData] = useState([]); // State untuk data jadwal

  // Fetch data dari API
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(
          "https://backend-paw-delta.vercel.app/api/meal/schedule"
        );

        // Transformasi data dari API
        const transformedData = response.data.map((item, index) => ({
          Id: index + 1, // ID unik untuk setiap item
          Subject: item.name, // Nama resep
          StartTime: new Date(item.startDate), // Tanggal mulai
          EndTime: new Date(
            new Date(item.startDate).getTime() + 60 * 60 * 1000
          ), // Tanggal selesai (startDate + 1 jam)
          Description: `Ingredients: ${item.ingredients.join(", ")}`, // Gabungkan bahan-bahan ke dalam deskripsi
          RecipeId: item.mealDBid, // ID resep
        }));

        setRecipeScheduleData(transformedData); // Set data jadwal ke state
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, []); // Empty dependency array to run once on mount

  // Event handler untuk mengarahkan ke halaman detail
  const handleEventClick = (args) => {
    const eventId = args.event.RecipeId; // Mengambil ID event yang diklik
    router.push(`/recipe/${eventId}`); // Navigasi ke halaman detail berdasarkan ID
  };

  return (
    <Layout>
      <Navbar />
      <div className="mt-5 ml-5">
        <ScheduleComponent
          width="800px"
          height="600px"
          eventSettings={{
            dataSource: recipeScheduleData,
            fields: {
              id: "Id",
              subject: { name: "Subject" },
              startTime: { name: "StartTime" },
              endTime: { name: "EndTime" },
              description: { name: "Description" },
            },
          }}
          eventClick={handleEventClick} // Tambahkan event handler
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </Layout>
  );
};

export default SchedulerPage;

// "use client";
// import React from "react";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
// } from "@syncfusion/ej2-react-schedule";
// import { registerLicense } from "@syncfusion/ej2-base";
// import Navbar from "../components/Navbar";
// import Layout from "../components/Layout";
// import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi

// registerLicense(
//   "Ngo9BigBOggjHTQxAR8/V1NDaF1cXmhIfEx0QHxbf1x0ZFRGal5WTndbUiweQnxTdEFiWH1bcXRWRmNVWUN1Xw=="
// );

// const SchedulerPage = () => {
//   const router = useRouter(); // Inisialisasi useRouter

//   const recipeScheduleData = [
//     {
//       Id: 1,
//       Subject: "Seafood Fried Rice",
//       StartTime: new Date(2024, 10, 25, 9, 0),
//       EndTime: new Date(2024, 10, 25, 10, 0),
//       Description: "Shrimp, Egg, Lettuce Rice, etc.",
//       RecipeId: 10,
//     },
//     {
//       Id: 2,
//       Subject: "Chicken Curry",
//       StartTime: new Date(2024, 10, 26, 12, 0),
//       EndTime: new Date(2024, 10, 26, 13, 30),
//       Description: "Chicken, Coconut Milk, Spices.",
//       RecipeId: 10,
//     },
//   ];

//   // Event handler untuk mengarahkan ke halaman detail
//   const handleEventClick = (args) => {
//     const eventId = args.event.RecipeId; // Mengambil ID event yang diklik
//     router.push(`/recipe/${eventId}`); // Navigasi ke halaman detail berdasarkan ID
//   };

//   return (
//     <Layout>
//       <Navbar />
//       <div className="mt-5 ml-5">
//         <ScheduleComponent
//           width="800px"
//           height="600px"
//           eventSettings={{
//             dataSource: recipeScheduleData,
//             fields: {
//               id: "Id",
//               subject: { name: "Subject" },
//               startTime: { name: "StartTime" },
//               endTime: { name: "EndTime" },
//               description: { name: "Description" },
//             },
//           }}
//           eventClick={handleEventClick} // Tambahkan event handler
//         >
//           <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//         </ScheduleComponent>
//       </div>
//     </Layout>
//   );
// };

// export default SchedulerPage;
