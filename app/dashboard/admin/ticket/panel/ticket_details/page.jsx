"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { db } from "@/lib/firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function TicketDetails() {
  const [ticketDetails, setTicketDetails] = useState();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const ticketData = searchParams.get("ticketData");
  console.log(ticketData);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const issuesRef = collection(db, "Issues");
        const q = query(issuesRef);
        const querySnapshot = await getDocs(q);
        const fetchedIssues = [];
        querySnapshot.forEach((doc) => {
          const issueData = doc.data();
          fetchedIssues.push({
            id: doc.id,
            type: issueData.type,
            ticketNumber: issueData.ticketNumber,
            ticketContent: issueData.ticketContent,
          });
        });

        // Filter the fetched issues based on ticketData
        const matchedIssue = fetchedIssues.find(
          (issue) => issue.ticketNumber === ticketData
        );

        if (matchedIssue) {
          // Handle the case when the issue is found
          console.log("Matched Issue:", matchedIssue);
          setTicketDetails(matchedIssue);
          // Do something with matchedIssue
        } else {
          // Handle the case when the issue is not found
          console.log("Issue not found with ticketNumber:", ticketData);
          // Do something when issue is not found
        }
      } catch (e) {
        console.error("Failed to fetch details:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [ticketData]);

  // Inline styles for each section
  const pageContainerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1000px",
    margin: "auto",
    marginTop: "50px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    padding: "20px",
    borderBottom: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d3e8fe",
  };

  const bodyContainerStyle = {
    display: "flex",
  };
  const sectionStyle = {
    marginTop: "15px",
    marginBottom: "20px",
    marginLeft: "50px",
    marginRight: "50px",
    backgroundColor: "#d3e8fe",
    padding: "20px",
    borderRadius: "8px",
  };
  const mainContentStyle = {
    
   width: "100%"
  };

  const closeButtonStyle = {
    cursor: "pointer",
  };

  const errorDetailItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)", // a subtle inner shadow
  };



  // The JSX structure of the page
  return (
    <div>
      <div style={pageContainerStyle}>
        <div style={headerStyle}>
          <h2>Ticket Details</h2>
          <span style={closeButtonStyle}>✖</span>
        </div>
        <div style={{ ...sectionStyle, marginTop: "30px" }}>
          <div style={errorDetailItemStyle}>

            <p>
              <strong>Ticket Number: </strong>
              {ticketDetails ? ticketDetails.ticketNumber : ""}
            </p>
          </div>
          <div style={errorDetailItemStyle}>
            <p>
              <strong>Type:  </strong>
              {ticketDetails ? ticketDetails.type : ""}
            </p>
          </div>
        </div>

        <div style={bodyContainerStyle}>
          <div style={mainContentStyle}>
            <div style={sectionStyle}>
              <strong>Ticket content: </strong> <br></br>
              <p>{ticketDetails ? ticketDetails.ticketContent : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
