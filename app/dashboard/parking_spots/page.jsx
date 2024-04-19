"use client"
import { useState } from 'react';
import { Button } from "@nextui-org/react";
import { cssClasses } from "@/app/lib/cssClasses";
const img = require("../../../public/parkTOP-640x428.jpg");
import CardIndex from "@/app/ui/CardIndex";

const ParkingSpots = () => {
  const [numCardsToShow, setNumCardsToShow] = useState(6); // State to track number of cards to display

  const dummyRecords = [
    { title: "B01", subtitle: "Sub Title 1"},
    { title: "B02", subtitle: "Sub Title 2"},
    { title: "B03", subtitle: "Sub Title 3" },
    { title: "B04", subtitle: "Sub Title 4" },
    { title: "B05", subtitle: "Sub Title 5" },
    { title: "B06", subtitle: "Sub Title 6" },
    { title: "B07", subtitle: "Sub Title 7" },
    { title: "B08", subtitle: "Sub Title 8" },
  ];

  const handleLoadMore = () => {
    setNumCardsToShow(prevNum => prevNum + 6); // Show 6 more cards
  };

  return (
    <>
      <h3 className={`${cssClasses.header1} mb-4}`} style={{ marginBottom: '20px', marginLeft: '110px' }}>
        Explore Parking Spots
      </h3>
      <div className="flex justify-end rounded-full mr-20" >
        <Button className={`${cssClasses.primaryButton} ${cssClasses.simpleFont}`}>Add New Spot</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 py-3 px-28 text-gray-600 ">
        {dummyRecords.slice(0, numCardsToShow).map((record, index) => (
          <CardIndex key={index} title={record.title} subtitle={record.subtitle} Img={img} likes={20}/>
        ))}
      </div>
      {numCardsToShow < dummyRecords.length && (
        <div className="flex justify-center" style={{ marginTop: '20px' }}>
          <Button onClick={handleLoadMore} className={`${cssClasses.secondaryButton} ${cssClasses.simpleFont}`}>Load More</Button>
        </div>
      )}
    </>
  );
}

export default ParkingSpots;