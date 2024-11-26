"use client";
import React from "react";
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

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cXmhIfEx0QHxbf1x0ZFRGal5WTndbUiweQnxTdEFiWH1bcXRWRmNVWUN1Xw=="
);

const SchedulerPage = () => {
  const router = useRouter(); // Inisialisasi useRouter

  const recipeScheduleData = [
    {
      Id: 1,
      Subject: "Seafood Fried Rice",
      StartTime: new Date(2024, 10, 25, 9, 0),
      EndTime: new Date(2024, 10, 25, 10, 0),
      Description: "Shrimp, Egg, Lettuce Rice, etc.",
      RecipeId: 10,
    },
    {
      Id: 2,
      Subject: "Chicken Curry",
      StartTime: new Date(2024, 10, 26, 12, 0),
      EndTime: new Date(2024, 10, 26, 13, 30),
      Description: "Chicken, Coconut Milk, Spices.",
      RecipeId: 10,
    },
  ];

  // Event handler untuk mengarahkan ke halaman detail
  const handleEventClick = (args) => {
    const eventId = args.event.RecipeId; // Mengambil ID event yang diklik
    router.push(`/recipe/${eventId}`); // Navigasi ke halaman detail berdasarkan ID
  };

  return (
    <Layout>
      <Navbar />
      <div className="mt-5 flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <ScheduleComponent
            width="100%"
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
      </div>
    </Layout>
  );
};

export default SchedulerPage;
