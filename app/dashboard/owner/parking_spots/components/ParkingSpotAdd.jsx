import Modal from "@/ui/Modal";
import { Input } from "@nextui-org/react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ParkingCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase/firebase";


const ParkingSpotAdd = ({
  modalStateProps,
  parkingLotId,
  refetchParkingSpots,
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [newParkingSpot, setNewParkingSpot] = useState({});
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (!parkingLotId) {
        throw new Error("parkingLotId is undefined");
      }
      const docRef = doc(db, "ParkingLots", parkingLotId);
      const parkingLotDoc = await getDoc(docRef);
      if (parkingLotDoc.exists()) {
        const parkingSpotsData = parkingLotDoc.data().parkingSpots || [];
        const parkingLotData = parkingLotDoc.data();
        
        await setDoc(docRef, {
          ...parkingLotData,
          parkingSpots: [
            ...parkingSpotsData,
            newParkingSpot,
          ],
        });
        toast("Parking spot created successfully", "success");
        modalStateProps.onClose();
        onClose();
        refetchParkingSpots();
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      stateProps={modalStateProps}
      title="Add Parking Spot"
      Icon={ParkingCircleIcon}
      onSubmit={onSubmit}
      size="sm"
      loading={loading}
      className={"py-4"}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-4">
        <Input
          value={newParkingSpot?.spotId}
          onValueChange={(value) =>
            setNewParkingSpot({ ...newParkingSpot, spotId: value })
          }
          label="Spot ID"
          className="rounded-xl"
        />
      </div>
    </Modal>
  );
};

export default ParkingSpotAdd;
