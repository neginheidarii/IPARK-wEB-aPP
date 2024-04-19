import Modal from "@/ui/Modal";
import { Input } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { ParkingCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ParkingSpotEdit = ({
  modalStateProps,
  parkingSpot,
  refetchParkingSpots,
  onClose = () => {},
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updatedParkingSpot, setUpdatedParkingSpot] = useState(parkingSpot);
  const [formValues, setFormValues] = useState({
    spotId: "",
  });
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        toast("Parking spot updated successfully", "success");
        setLoading(false);
        modalStateProps.onClose();
        onClose();
      }, 2000);
      router.push("/dashboard/owner/parking_spots");
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    if (parkingSpot) {
      setFormValues({
        spotId: parkingSpot.spotId,
      });
    }
  }, [parkingSpot]);


  return (
    <Modal
      stateProps={modalStateProps}
      title="Edit Parking Spot"
      Icon={ParkingCircleIcon}
      onSubmit={onSubmit}
      size="sm"
      loading={loading}
      className={"py-4"}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-4">
        <Input
          value={formValues?.spotId}
          onValueChange={(value) =>
            setFormValues({ ...formValues, spotId: value })
          }
          label="Spot ID"
          className="rounded-xl"
        />
      </div>
    </Modal>
  );
};

export default ParkingSpotEdit;
