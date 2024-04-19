"use client";
import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { cssClasses } from "@/lib/cssClasses";
import CardIndex from "@/ui/CardIndex";
import CustomBreadcrumbs from "@/ui/CustomBreadcrumbs";
import SelectParkingLot from "@/ui/SelectParkingLot";
import { FilterIcon } from "lucide-react";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";
import ParkingSpotAdd from "./components/ParkingSpotAdd";
import { toast } from "sonner";

const ParkingSpots = () => {
  const [numCardsToShow, setNumCardsToShow] = useState(6);
  const [parkingLotId, setParkingLotId] = useState("");
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);
  const [errors, setErrors] = useState({});
  const currentUser = auth.currentUser;
  const addParkingSpotModal = useDisclosure();
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    if (!parkingLotId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "ParkingLots", parkingLotId);
        const parkingLotDoc = await getDoc(docRef);

        if (parkingLotDoc.exists()) {
          const parkingSpotsData = parkingLotDoc.data().parkingSpots || [];
          console.log({ parkingSpotsData: parkingLotDoc.data() })
          setParkingSpots(parkingSpotsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setErrors({ message: "Failed to fetch data" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parkingLotId, refetchKey]);

  const handleLoadMore = () => {
    setNumCardsToShow((prevNum) => prevNum + 6);
  };

  const onDelete = async (spotId) => {
    try {
      const docRef = doc(db, "ParkingLots", parkingLotId);
      const parkingLotDoc = await getDoc(docRef);
      if (parkingLotDoc.exists()) {
        const parkingSpotsData = parkingLotDoc.data().parkingSpots || [];
        const parkingLotData = parkingLotDoc.data();

        const newParkingSpots = parkingSpotsData.filter(
          (spot) => spot.spotId !== spotId
        );

        await updateDoc(docRef, {
          ...parkingLotData,
          parkingSpots: newParkingSpots,
        });

        toast("Parking spot deleted successfully", "success");
        setRefetchKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  
  }

  useEffect(() => {
    console.log({ parkingLotId });
    console.log({ parkingSpots });
  }, [parkingLotId]);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/owner" },
    { label: "Parking Spots", href: "/dashboard/owner/parking_spots" },
  ];

  return (
    <div className="container py-8">
      <ParkingSpotAdd
        modalStateProps={addParkingSpotModal}
        parkingLotId={parkingLotId}
        refetchParkingSpots={() => {
          setRefetchKey((prevKey) => prevKey + 1);
        }}
        onClose={() => setSelectedParkingSpot(null)}
      />
      <CustomBreadcrumbs title={"Parking Spots"} items={breadcrumbs}>
        <Button
          className={`${cssClasses.primaryButton} ${cssClasses.simpleFont}`}
          onClick={() => {
            if (!parkingLotId) {
              toast("Please select a parking lot first", "error");
            } else {
              addParkingSpotModal.onOpen();
            }
          }}
        >
          Add New Spot
        </Button>
      </CustomBreadcrumbs>
      <div className="flex flex-col justify-start my-8 border border-gray-200 px-8 pt-8 pb-8 space-y-8  rounded-xl">
        <h1 className="font-bold text-xl flex items-center space-x-2">
          <FilterIcon size={24} />
          <p>Filters</p>
        </h1>
        <SelectParkingLot
          setParkingLotId={setParkingLotId}
          className={"min-w-[400px] w-min"}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 text-gray-600 mt-8">
        {parkingSpots.slice(0, numCardsToShow).map((spot, index) => (
          <CardIndex
            key={index}
            title={spot.spotId}
            subtitle={spot.subtitle}
            occupied={spot.occupied}
            onDelete={() => onDelete(spot.spotId)}
          />
        ))}
      </div>
      {numCardsToShow < parkingSpots.length && (
        <div className="flex justify-center" style={{ marginTop: "20px" }}>
          <Button
            onClick={handleLoadMore}
            className={`${cssClasses.secondaryButton} ${cssClasses.simpleFont}`}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ParkingSpots;
