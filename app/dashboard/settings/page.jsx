"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { cssClasses } from "@/app/lib/cssClasses";

const img = require("../../../public/p1.jpg");

const ProfilePicture = ({ img }) => {
  return (
    <div
      style={{
        width: "100px", // Adjust the size as needed
        height: "100px", // Adjust the size as needed
        borderRadius: "50%", // Makes it rounded
        overflow: "hidden", // Hides any overflowing content
      }}
    >
      <Image
        src={img}
        alt="Profile"
        width={100}
        height={100}
        layout="responsive"
      />
    </div>
  );
};

const Settings = () => {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    location: "New York City",
    phoneNumber: "437 321 12 12",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e, field) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value
    });
  };

  const handleUpdatePassword = () => {
    // Implement update password functionality here
    console.log("Update password:", profileData.newPassword);
  };

  const handleSignOut = () => {
    // Implement sign out functionality here
    console.log("Signing out...");
  };

  return (
    <>
      <h3 className={`${cssClasses.header1} mb-4}`} style={{ marginBottom: '20px' }}>Profile Information</h3>
      <div className="flex gap-6" style={{ marginBottom: '20px' }}>
        <ProfilePicture img={img} />
        <div className="flex flex-row gap-4 justify-between" style={{ marginTop: '50px' }}>
          <Button className={`${cssClasses.primaryButton} ${cssClasses.simpleFont}`}>Add Photo</Button>
          <Button className={`${cssClasses.secondaryButton} ${cssClasses.simpleFont}`}>Remove</Button>
        </div>
      </div>
      <div className="flex w-full gap-4 flex-wrap" style={{ marginBottom: '20px' }}>
        <Input
          type="text"
          label="Full Name"
          placeholder="Name Surname"
          labelPlacement="outside"
          value={profileData.fullName}
          onChange={(e) => handleInputChange(e, "fullName")}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Your email"
          labelPlacement="outside"
          value={profileData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <Input
          type="text"
          label="Location"
          placeholder="New York City"
          labelPlacement="outside"
          value={profileData.location}
          onChange={(e) => handleInputChange(e, "location")}
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
      <hr style={{ borderTop: '1px solid black', marginTop: '20px' }} />
      <h2 className={cssClasses.header2} style={{ marginBottom: '20px' }}>Reset Password</h2>
      <div className="flex  gap-4 flex-wrap" style={{ marginBottom: '20px' }}>
        <Input
          type="password"
          label="Old password"
          placeholder="P4$$w0rd"
          labelPlacement="outside"
          value={profileData.oldPassword}
          onChange={(e) => handleInputChange(e, "oldPassword")}
        />
        <Input
          type="password"
          label="New password"
          placeholder="******"
          labelPlacement="outside"
          value={profileData.newPassword}
          onChange={(e) => handleInputChange(e, "newPassword")}
        />
        <Input
          type="password"
          label="Confirm password"
          placeholder="******"
          labelPlacement="outside"
          value={profileData.confirmPassword}
          onChange={(e) => handleInputChange(e, "confirmPassword")}
        />
      </div>
      <div className="flex justify-center gap-40" style={{ marginTop: '20px' }}>
        <Button className={`${cssClasses.primaryButton} ${cssClasses.simpleFont}`} onClick={handleUpdatePassword}>Update Password</Button>
        <Button radius="md" color="danger" onClick={handleSignOut}>Sign Out</Button>
      </div>
    </>
  );
};

export default Settings;