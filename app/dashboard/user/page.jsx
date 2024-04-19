"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";
import { Textarea } from "@nextui-org/react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase/firebase";

const db = getFirestore(firebaseApp);

const CreateTicket = () => {
  const [ticketNumber, setTicketNumber] = useState("1000");
  const [ticketContent, setTicketContent] = useState("");

  const generateTicketNumber = () => {
    setTicketNumber(String(Number(ticketNumber) + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add ticket data to Firebase
      await addDoc(collection(db, "Issues"), {
        ticketNumber,
        ticketContent,
        type: "ticket",
      });
      alert("You have successfully submitted your ticket.");
      generateTicketNumber();
      setTicketContent(""); // Clear the textarea after submission
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  return (
    <>
      <h2 className={`${cssClasses.header2} pt-10`}>File your complaint</h2>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        Our support team will get back to you as soon as possible.
      </p>
      <Textarea
        value={ticketContent}
        onChange={(e) => setTicketContent(e.target.value)}
        style={{
          height: "250px",
          fontSize: "16px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button
        type="submit"
        className={`${cssClasses.secondaryButton} ${cssClasses.simpleFont}, bg-blue-600 w-64`}
        onClick={handleSubmit} // Call handleSubmit when the button is clicked
      >
        Submit Ticket
      </button>
    </>
  );
};

export default CreateTicket;
