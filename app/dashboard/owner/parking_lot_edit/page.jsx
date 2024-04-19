// ParkingLotEdit.js
"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { firebaseApp } from "../../../lib/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cssClasses } from "@/lib/cssClasses";
import UpSection from "@/Components/Parking_lot_edit/UpSection";
import BottomSection from "@/Components/Parking_lot_edit/BottomSection";
//auth
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const ParkingLotEdit = () => {
  const [formState, setFormState] = useState({
    address: "",
    province: "",
    postalCode: "",
    capacity: "",
    ownershipType: "",
    accessType: "",
    uid: auth?.currentUser?.uid,
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formState, setErrors)) {
      return;
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "ParkingLots"), {
        ...formState,
      });
      toast.success("Application updated successfully!");
      router.push("/dashboard/parking_lot_edit");
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrors({});
  }, [formState]);

  return (
    <>
      <h1 className={cssClasses.header1}>Parking Lot</h1>
      <UpSection
        formState={formState}
        setFormState={setFormState}
        errors={errors}
      />
      <BottomSection />
      {/* <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
};

export default ParkingLotEdit;
