"use client";
import {
  Input,
  Listbox,
  ListboxItem,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
  Modal,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { IoMdAlert } from "react-icons/io";
import { ParkingCircle, SearchIcon, SquarePenIcon } from "lucide-react";
import { auth, db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const SelectParkingLot = ({ errors, setParkingLotId, className }) => {
  const [parkingLots, setParkingLots] = useState([]);
  const [selectedParkingLot, setSelectedParkingLot] = useState(new Set([]));
  const [selectedParkingLotInfo, setSelectedParkingLotInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = auth?.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "ParkingLots"),
          where("uid", "==", currentUser?.uid)
        );
        const querySnapshot = await getDocs(q);
        const lots = querySnapshot.docs.map((doc) => ({
          id: doc.id, // programatically add id for easy access
          ...doc.data(),
        }));

        setParkingLots(lots);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    setParkingLotId([...selectedParkingLot][0]);
    setSelectedParkingLotInfo(
      parkingLots.find(
        (parkingLot) => parkingLot.id === [...selectedParkingLot][0]
      )
    );
  }, [selectedParkingLot]);

  return (
    <form className={`flex items-center w-full ${className}`}>
      <Modal
        style={{ zIndex: "100" }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex space-x-2 items-center gap-1">
                <SearchIcon className={"w-5 h-5"} />
                <span>Search existing parking lots</span>
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  label={"Search by name or address"}
                  placeholder={"North york centre"}
                />
                <span className={"text-[#F31161] mx-1 text-xs"}>
                  {errors?.parkingLotId}
                </span>
                <div className={"flex justify-center items-center"}>
                  {loading ? (
                    <Spinner className={"mx-auto my-auto"} />
                  ) : (
                    <Listbox
                      // topContent={topContent}
                      defaultSelectedKeys={["1"]}
                      items={parkingLots}
                      label="Assigned to"
                      selectionMode="single"
                      onSelectionChange={setSelectedParkingLot}
                      selectedKeys={selectedParkingLot}
                      variant="flat"
                    >
                      {(parkingLot) => (
                        <ListboxItem key={parkingLot.id} value={parkingLot.id}>
                          <div className="flex gap-2 items-center">
                            <ParkingCircle className={"w-6 h-6"} />
                            <div className="flex flex-col">
                              <span className="text-small">
                                {parkingLot.name}
                              </span>
                              <span className="text-tiny text-default-400">
                                {parkingLot?.address?.street +
                                  ", " +
                                  parkingLot?.address?.city}
                              </span>
                            </div>
                          </div>
                        </ListboxItem>
                      )}
                    </Listbox>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div
        className={
          "flex flex-col sm:flex-row flex-grow justify-between items-center"
        }
      >
        {[...selectedParkingLot].length === 0 ? (
          <div className={"flex space-x-2"}>
            <IoMdAlert className={"w-12 h-12"} />
            <div className={"flex justify-center flex-col"}>
              <span className="text-md">Select a parking lot</span>
              <span className="text-tiny text-default-400">
                {" "}
                Click on change to choose the parking lot{" "}
              </span>
            </div>
          </div>
        ) : (
          <div className={"flex space-x-2"}>
            <ParkingCircle className={"w-12 h-12"} />
            <div className={"flex justify-center flex-col"}>
              <span className="text-xl">{selectedParkingLotInfo?.name}</span>
              <span className="text-tiny text-default-400">
                {" "}
                {selectedParkingLotInfo?.address?.street +
                  ", " +
                  selectedParkingLot?.address?.city}{" "}
              </span>
            </div>
          </div>
        )}
        <div
          className={
            "flex flex-row space-x-2 sm:space-x-0 sm:flex-col space-y-1 xl:flex-row xl:space-y-0 xl:space-x-1 items-end justify-end"
          }
        >
          <Button
            type={"button"}
            variant={"flat"}
            className={`text-xs ${
              errors?.parkingLotId
                ? "animate-pulse bg-red-500 border border-red-800 text-white shadow-xl"
                : ""
            }`}
            onPress={onOpen}
          >
            Choose
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SelectParkingLot;
