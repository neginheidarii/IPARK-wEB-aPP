"use client";
import { Button } from "@nextui-org/react";
import { cssClasses } from "@/lib/cssClasses";
import Card from "@/ui/Card";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Page = () => {
  const items = [
    { title: "Manage Reservation", date: "Today" },
    { title: "View Analytics", date: "Yesterday" },
    { title: "Parking Spot Availability", date: "2 days ago" },
  ];
  const feedbacks = [
    { user: "John Doe", feedback: "Great experience!", date: "Today" },
    {
      user: "Jane Smith",
      feedback:
        "Best experience, easy payment, hessle free parking reservation.",
      date: "Yesterday",
    },
    { user: "Alex Johnson", feedback: "Awesome service!", date: "2 days ago" },
  ];

  const renderItems = () => {
    return items.map((item, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px 0",
          borderBottom: index === items.length - 1 ? "none" : "2px solid black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 40,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <span>{item.title}</span>
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 35 }}
          >
            {/* Circle for unread messages */}
            {/* Example: Show the circle if the message is unread */}
            {index === 0 && (
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#FF0000", // Example color for unread messages indicator
                  marginRight: 5, // Add margin between circle and date
                }}
              />
            )}
            {item.date}
          </div>
        </div>
      </div>
    ));
  };

  const renderFeedbacks = () => {
    return feedbacks.map((feedback, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom:
            index === feedbacks.length - 1 ? "none" : "2px solid black",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* User profile picture in a circle */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "80%",
              backgroundColor: "#ccc", // Placeholder color for profile picture
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>U</span> {/* Placeholder for user profile */}
          </div>
          <div>
            <div>{feedback.user}</div>
            <div>{feedback.feedback}</div>
          </div>
        </div>
        <span>{feedback.date}</span>
      </div>
    ));
  };

  return (
    <>
      <h3 className={`${cssClasses.header1} mb-4`}>Welcome, Parking Owner!</h3>
      <p className="mb-20">Here is your parking spot management</p>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <div
          className="bg-[#cddff2] rounded-lg"
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar"]}>
              <DateCalendar
                referenceDate={dayjs("2022-04-17")}
                views={["year", "month", "day"]}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div
          className="bg-[#cddff2] rounded-lg"
          style={{
            width: "60%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 20,
              marginLeft: 15,
            }}
          >
            <h6 className={`${cssClasses.header1} mb-4`}>Your Parking Spots</h6>
          </div>
          {/* Render the list of items */}
          {renderItems()}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <div
          className="bg-[#cddff2] rounded-lg"
          style={{
            marginTop: 20,
            marginBottom: 40,
            width: "92%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifySelf: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 20,
              marginBlockStart: 20,
              marginLeft: 15,
              width: "50%",
            }}
          >
            <h6 className={`${cssClasses.header1} mb-4`}>New Feedbacks</h6>
            {renderFeedbacks()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
