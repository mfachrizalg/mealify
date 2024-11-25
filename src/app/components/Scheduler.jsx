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

const SchedulerPage = () => {
  // Sample recipe schedule data
  const recipeScheduleData = [
    {
      Id: 1,
      Subject: "Seafood Fried Rice",
      StartTime: new Date(2024, 10, 25, 9, 0), // Start Date and Time
      EndTime: new Date(2024, 10, 25, 10, 0), // End Date and Time
      Description: "Shrimp, Egg, Lettuce Rice, etc.",
    },
    {
      Id: 2,
      Subject: "Chicken Curry",
      StartTime: new Date(2024, 10, 26, 12, 0),
      EndTime: new Date(2024, 10, 26, 13, 30),
      Description: "Chicken, Coconut Milk, Spices.",
    },
    {
      Id: 3,
      Subject: "Pasta Carbonara",
      StartTime: new Date(2024, 10, 27, 15, 0),
      EndTime: new Date(2024, 10, 27, 16, 30),
      Description: "Pasta, Cheese, Bacon, Cream.",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Recipe Schedule
      </h1>
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
        {/* Inject different views */}
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default SchedulerPage;
