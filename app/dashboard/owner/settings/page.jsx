"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Divider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { cssClasses } from "@/lib/cssClasses";
import { MdUpdate } from 'react-icons/md';
import {
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";
import { toast } from 'sonner';


const Settings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: {
      city: "",
      street: "",
      postalCode: "",
    }
  });
  const [loading, setLoading] = useState(false);
  const currentUser = auth.currentUser;
  
  useEffect(() => {
    if (!currentUser) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "Owners", currentUser.uid);
        const ownerRef = await getDoc(docRef);
        if (ownerRef.exists()) {
          const ownerInfo = ownerRef.data() || [];
          setProfileData(ownerInfo);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setErrors({ message: "Failed to fetch data" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleInputChange = (e, field) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value
    });
  };

  console.log({ profileData })

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Owners", currentUser.uid);
      await setDoc(docRef, {
        ...profileData
      });
      toast("Profile updated successfully", { type: 'success' });
    } catch (error) {
      console.error("Failed to update data:", error);
      toast("Failed to update profile", { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className={`${cssClasses.header1} mb-4}`} style={{ marginBottom: '20px' }}>Profile Information</h3>
      <div className="flex w-max gap-4 flex-wrap" style={{ marginBottom: '20px' }}>
        <Input
          type="text"
          label="First Name"
          placeholder="John"
          labelPlacement="outside"
          value={profileData.firstName}
          onValueChange={(newVal) => setProfileData({ ...profileData, firstName: newVal })}
        />
        <Input
          type="text"
          label="Last Name"
          placeholder="Doe"
          labelPlacement="outside"
          value={profileData.lastName}
          onValueChange={(newVal) => setProfileData({ ...profileData, lastName: newVal })}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Your email"
          labelPlacement="outside"
          value={profileData.email}
          onValueChange={(newVal) => setProfileData({ ...profileData, email: newVal })}
        />
        <Input
          type="text"
          label="Street"
          placeholder="123 Street Name"
          labelPlacement="outside"
          value={profileData.address.street}
          onValueChange={(newVal) => setProfileData({ ...profileData, address: { ...profileData.address, street: newVal } })}
        />
        <Input
          type="text"
          label="Postal Code"
          placeholder="A1B 2C3"
          labelPlacement="outside"
          value={profileData.address.postalCode}
          onValueChange={(newVal) => setProfileData({ ...profileData, address: { ...profileData.address, postalCode: newVal } })}
        />
        <Input
          type="text"
          label="Country"
          placeholder="Canada"
          labelPlacement="outside"
          value={profileData.address.country}
          onValueChange={(newVal) => setProfileData({ ...profileData, address: { ...profileData.address, country: newVal } })}
        />
        <Input
          type="number"
          label="Phone Number"
          placeholder="437 321 12 12"
          labelPlacement="outside"
          value={profileData.phoneNumber}
          onChange={(e) => handleInputChange(e, "phoneNumber")}
        />
      </div>
      <div className="flex justify-start mt-8">
        <Button radius="md" color="primary" onClick={handleUpdate} className='flex'>
          <MdUpdate />
          <p>Update</p>
        </Button>
      </div>
    </>
  );
};

export default Settings;