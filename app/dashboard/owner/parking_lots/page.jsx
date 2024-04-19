"use client";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../lib/firebase/firebase";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getKeyByValue } from "../../../lib/utils";
import CustomBreadcrumbs from "@/ui/CustomBreadcrumbs";
import { EyeIcon, TrashIcon } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Parking Lots", href: "/dashboard/parking_lots" },
];

const Page = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [selectedLots, setSelectedLots] = useState(new Set());
  const [refetchKey, setRefetchKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchParkingLots = async () => {
      setLoading(true);
      if (!currentUser) return;
      const q = query(
        collection(db, "ParkingLots"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const lots = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setParkingLots(lots);
      setLoading(false);
    };
    fetchParkingLots();
  }, [refetchKey]);

  const handleSelectLot = (id) => {
    setSelectedLots((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteSelected = async () => {
    const selectedLotsArray = [...selectedLots];
    await Promise.all(
      selectedLotsArray.map((id) => deleteDoc(doc(db, "ParkingLots", id)))
    );
    setRefetchKey((prev) => prev + 1);
    return;
  };

  useEffect(() => {
    console.log(selectedLots);
  }, [selectedLots]);

  return (
    <div>
      <CustomBreadcrumbs title={"Parking Lots"} items={breadcrumbs}>
        {selectedLots?.size > 0 || selectedLots === "all" ? (
          <Button
            onClick={handleDeleteSelected}
            className="bg- hover:cursor-pointer flex w-max text-red-500 hover:text-red-800"
          >
            <FaTrashAlt className="font-bolder" size={20} />
          </Button>
        ) : null}
      </CustomBreadcrumbs>
      <Table
        isStriped
        removeWrapper
        className={`text-sm`}
        selectionMode="multiple"
        selectionBehavior={"toggle"}
        selectedKeys={selectedLots}
        onSelectionChange={setSelectedLots}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>LOCATION</TableColumn>
          <TableColumn>CAPACITY</TableColumn>
          <TableColumn>RATE</TableColumn>
          <TableColumn>View</TableColumn>
        </TableHeader>
        <TableBody
          className="font-light"
          items={parkingLots}
          isLoading={loading}
          loadingContent={<Spinner />}
          emptyContent="No parking lots found"
        >
          {(parkingLot) => (
            <TableRow key={parkingLot.id}>
              <TableCell className="font-semibold">
                {parkingLot?.name}
              </TableCell>
              <TableCell>
                {parkingLot?.address?.street +
                  ", " +
                  parkingLot?.address?.city +
                  ", " +
                  parkingLot?.address?.postalCode}
              </TableCell>
              <TableCell>
                <p>{parkingLot?.capacity} spots</p>
              </TableCell>
              <TableCell>
                <p>${parkingLot?.rate}/h</p>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/owner/parking_lots/${parkingLot.id}`}>
                  <EyeIcon className="hover:cursor-pointer" size={20} />
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
