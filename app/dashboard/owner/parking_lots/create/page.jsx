"use client";
import React, { useEffect, useState } from "react";

import { getFirestore, addDoc, collection } from "firebase/firestore";
import { firebaseApp } from "../../../../lib/firebase/firebase";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { toast } from "sonner";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import Card from "../../../../ui/Card";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoMdInformationCircle } from "react-icons/io";
import { MapPin } from "lucide-react";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function ApplyForParking() {
  const [formState, setFormState] = useState({
    address: {
      city: "",
      country: "",
      postalCode: "",
      street: "",
    },
    name: "",
    capacity: "",
    rate: "",
    ownershipType: "",
    hasInsurance: "",
    agreed: false,
    hasInsurance: false,
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
      toast.success("Application submitted successfully!");
      router.push("/dashboard/owner/parking_lots");
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
    <Card
      title="Apply for Parking"
      Icon={GrDocumentUpdate}
    >
      <form onSubmit={handleSubmit}>
        <main className="flex flex-col">
          <p className="font-light text-sm text-gray-600">
            Fill out the required information.
          </p>
          {/* Steps Indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          ></div>

          <div className="flex flex-col md:flex-row gap-2 mb-8">
            {/* Location Section */}
            <div className="w-[50%] space-y-3">
              <div className="flex space-x-1 text-gray-800 items-center mb-4">
                <MapPin className="w-5 h-5" />
                <p className="text-lg font-semibold">Location</p>
              </div>
              <Input
                label="Street line 1"
                value={formState.address.street}
                isInvalid={!errors?.street == "" || !errors?.street == null}
                onValueChange={(newVal) =>
                  setFormState({
                    ...formState,
                    address: { ...formState.address, street: newVal },
                  })
                }
              />
              <div className="flex space-x-2">
                <Input
                  label="City"
                  value={formState.address?.city}
                  isInvalid={!errors?.city == "" || !errors?.city == null}
                  onValueChange={(newVal) =>
                    setFormState({
                      ...formState,
                      address: { ...formState.address, city: newVal },
                    })
                  }
                />
                <Input
                  label="Country"
                  value={formState.address?.country}
                  isInvalid={!errors?.country == "" || !errors?.country == null}
                  onValueChange={(newVal) =>
                    setFormState({
                      ...formState,
                      address: { ...formState.address, country: newVal },
                    })
                  }
                />
              </div>
              <Input
                label="Postal code"
                value={formState.address?.postalCode}
                isInvalid={
                  !errors?.postalCode == "" || !errors?.postalCode == null
                }
                onValueChange={(newVal) =>
                  setFormState({
                    ...formState,
                    address: { ...formState.address, postalCode: newVal },
                  })
                }
              />
            </div>

            <div class="w-px self-stretch bg-gradient-to-tr mx-2 from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-800"></div>

            {/* Parking Lot Details Section */}
            <div className="w-[50%]">
              <div className="flex space-x-1  text-gray-800 items-center mb-4">
                <IoMdInformationCircle className="w-5 h-5" />
                <p className="text-lg font-semibold">Parking lot information</p>
              </div>
              <Input
                label="Name"
                value={formState?.name}
                isInvalid={!errors?.name == "" || !errors?.name == null}
                onValueChange={(newVal) =>
                  setFormState({
                    ...formState,
                    name: newVal,
                  })
                }
              />

              <div className="flex space-x-2">
                <Input
                  type="number"
                  label="Capacity"
                  className="mt-3"
                  value={formState?.capacity}
                  isInvalid={
                    !errors?.capacity == "" || !errors?.capacity == null
                  }
                  onValueChange={(newVal) =>
                    setFormState({
                      ...formState,
                      capacity: newVal,
                    })
                  }
                />
                <Input
                  type="number"
                  label="Rate"
                  className="mt-3"
                  value={formState?.rate}
                  isInvalid={!errors?.rate == "" || !errors?.rate == null}
                  onValueChange={(newVal) =>
                    setFormState({
                      ...formState,
                      rate: newVal,
                    })
                  }
                />
              </div>

              <Autocomplete
                isInvalid={
                  !errors?.ownershipType == "" || !errors?.ownershipType == null
                }
                selectedKey={formState?.ownershipType}
                onSelectionChange={(newVal) =>
                  setFormState({ ...formState, ownershipType: newVal })
                }
                label="Ownership type"
                className="mt-3"
              >
                {ownershipTypes.map((ownership) => (
                  <AutocompleteItem
                    key={ownership.value}
                    value={ownership.value}
                  >
                    {ownership.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>

          <Checkbox
            isInvalid={!errors?.agreed == "" || !errors?.agreed == null}
            isSelected={formState?.agreed}
            onValueChange={(newVal) =>
              setFormState({ ...formState, agreed: newVal })
            }
            defaultSelected
            size="sm"
            className="items-start"
          >
            <p className="font-light text-sm -translate-y-[0.1em]">
              I hereby grant permission to IPark to review and verify the
              following documents for the purpose of assessing eligibility.
            </p>
          </Checkbox>

          <Checkbox
            isInvalid={
              !errors?.hasInsurance == "" || !errors?.hasInsurance == null
            }
            isSelected={formState?.hasInsurance}
            onValueChange={(newVal) =>
              setFormState({ ...formState, hasInsurance: newVal })
            }
            defaultSelected
            size="sm"
            className="items-start mt-2"
          >
            <p className="font-light text-sm -translate-y-[0.1em]">
              I have car insurance.
            </p>
          </Checkbox>

          <Button
            isLoading={loading}
            type="submit"
            className="self-end flex space-x-1"
          >
            <p>Submit</p>
            <GrDocumentUpdate />
          </Button>
        </main>
      </form>
    </Card>
  );
}

const ownershipTypes = [
  {
    value: 1,
    label: "Private Ownership",
  },
  {
    value: 2,
    label: "Public Ownership",
  },
  {
    value: 3,
    label: "Commercial Ownership",
  },
  {
    value: 4,
    label: "Shared Ownership",
  },
  {
    value: 5,
    label: "Residential Ownership",
  },
  {
    value: 6,
    label: "Other",
  },
];

const validate = (formState, setErrors) => {
  if (!formState?.address?.street) {
    toast("Please provide a valid street address.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      street: "Please provide a valid street address.",
    }));
    return false;
  }

  if (!formState?.address?.city) {
    toast("Please provide a valid city.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      city: "Please provide a valid city.",
    }));
    return false;
  }

  if (!formState?.address?.country) {
    toast("Please provide a valid country.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      country: "Please provide a valid country.",
    }));
    return false;
  }

  if (!formState?.address?.postalCode) {
    toast("Please provide a valid postal code.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      postalCode: "Please provide a valid postal code.",
    }));
    return false;
  }

  if (!formState?.name) {
    toast("Please provide a valid name.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      name: "Please provide a valid name.",
    }));
    return false;
  }

  if (!formState?.capacity) {
    toast("Please provide a valid capacity.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      capacity: "Please provide a valid capacity.",
    }));
    return false;
  }

  if (!formState?.rate) {
    toast("Please provide a valid rate.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      rate: "Please provide a valid rate.",
    }));
    return false;
  }

  if (!formState?.ownershipType) {
    toast("Please provide a valid ownership type.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      ownershipType: "Please provide a valid ownership type.",
    }));
    return false;
  }

  if (!formState?.agreed) {
    toast("Please agree to the terms and conditions.", { type: "error" });
    setErrors((prev) => ({
      ...prev,
      agreed: "Please agree to the terms and conditions.",
    }));
    return false;
  }

  return true;
};
