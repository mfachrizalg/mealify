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
import Cookies from "js-cookie";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cXmhIfEx0QHxbf1x0ZFRGal5WTndbUiweQnxTdEFiWH1bcXRWRmNVWUN1Xw=="
);

const SchedulerPage = () => {
  const router = useRouter();
  const [recipeScheduleData, setRecipeScheduleData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const token = Cookies.get("mealify");
    if (!token) {
      router.push("/landing");
    } else {
      const fetchScheduleData = async () => {
        try {
          const response = await axios.get(
            "https://backend-paw-delta.vercel.app/api/meal/schedule",
            {
              headers: {
                "Content-Type": "application/json",
                Cookie: `mealify=${Cookies.get("mealify")}`,
                Authorization: `Bearer ${Cookies.get("mealify")}`,
              },
              withCredentials: true,
            }
          );

          const transformedData = response.data.map((item, index) => ({
            Id: index + 1,
            Subject: item.name,
            StartTime: new Date(item.startDate),
            EndTime: new Date(
              new Date(item.startDate).getTime() + 60 * 60 * 1000
            ),
            Description: `Ingredients: ${item.ingredients.join(", ")}`,
            RecipeId: item.mealDBid, // Recipe ID used for deletion
          }));

          setRecipeScheduleData(transformedData);
        } catch (error) {
          console.error("Error fetching schedule data:", error);
        }
      };

      fetchScheduleData();
    }
  }, [router]);

  // Handle delete functionality
  const handleDelete = async (data) => {
    const { RecipeId } = data;

    try {
      // Send DELETE request to API
      await axios.delete(
        `https://backend-paw-delta.vercel.app/api/meal/schedule/${RecipeId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("mealify")}`,
          },
          withCredentials: true,
        }
      );

      // Update state to remove the deleted item
      setRecipeScheduleData((prevData) =>
        prevData.filter((item) => item.RecipeId !== RecipeId)
      );

      alert("Schedule deleted successfully!");

      router.refresh(); // This reloads the page without a full refresh
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete the schedule.");
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <Layout>
      <Navbar />
      <div className="max-h-min">
        <ScheduleComponent
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
          quickInfoTemplates={{
            header: (data) => (
              <div className="bg-blue-500 text-white p-4 rounded-t">
                <h2 className="font-bold text-lg truncate" title={data.Subject}>
                  {data.Subject}
                </h2>
              </div>
            ),
            content: (data) => (
              <div className="bg-gray-100 p-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Time:</span>{" "}
                  {`${formatTime(data.StartTime)} - ${formatTime(
                    data.EndTime
                  )}`}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Description:</span>{" "}
                  {data.Description}
                </p>
              </div>
            ),
            footer: (data) => (
              <div className="bg-gray-100 p-4 flex justify-end items-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(data)}
                >
                  Delete
                </button>
              </div>
            ),
          }}
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
