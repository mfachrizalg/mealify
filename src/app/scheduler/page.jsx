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
// import global css
// Replace with your actual license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cXmhIfEx0QHxbf1x0ZFRGal5WTndbUiweQnxTdEFiWH1bcXRWRmNVWUN1Xw=="
);

const SchedulerPage = () => {
  const recipeScheduleData = [
    {
      Id: 1,
      Subject: "Seafood Fried Rice",
      StartTime: new Date(2024, 10, 25, 9, 0),
      EndTime: new Date(2024, 10, 25, 10, 0),
      Description: "Shrimp, Egg, Lettuce Rice, etc.",
    },
    {
      Id: 2,
      Subject: "Chicken Curry",
      StartTime: new Date(2024, 10, 26, 12, 0),
      EndTime: new Date(2024, 10, 26, 13, 30),
      Description: "Chicken, Coconut Milk, Spices.",
    },
  ];

  return (
    <Layout>
      <Navbar />
      <ScheduleComponent
        height="650px"
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
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </Layout>
  );
};

export default SchedulerPage;
