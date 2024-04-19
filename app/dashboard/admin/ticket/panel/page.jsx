"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { cssClasses } from "@/lib/cssClasses";
// const img = require("/issue-ticket.png").default;
import { db } from "@/lib/firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";

const Page = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
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
        setIssues(fetchedIssues);
        console.log(fetchedIssues);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleViewDetails = (ticketData) => {
    navigation.push(
      `/dashboard/admin/ticket/panel/ticket_details?ticketData=${JSON.stringify(ticketData)}`
    );
  };

  return (
    <>
      <div className="bg-[#cddff2] my-6 rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {issues.map((data, index) => (
            <div
              key={index}
              className="rounded-lg p-6 flex flex-col justify-between"
            >
              <div className="mx-auto rounded overflow-hidden">
                <Image
                  src={"/issue-ticket.png"}
                  alt="Ticket"
                  width={250}
                  height={250}
                  layout="responsive"
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                {/* Display rating */}
                <div className="flex items-center">
                  <h4 className=" text-black-800 mt-4">
                    Ticket Number: {data.ticketNumber}
                  </h4>
                </div>
                <Link
                  href={`/dashboard/admin/ticket/panel/ticket_details?ticketData=${data.ticketNumber}`}
                  passHref
                >
                  <Button className="bg-blue-500 text-white rounded-full px-4 py-4">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
