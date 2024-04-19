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
import CustomBreadcrumbs from "@/ui/CustomBreadcrumbs";
import { EyeIcon, TrashIcon } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reservations", href: "/dashboard/owner/reservations" },
];

const Page = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState(new Set());
  const [refetchKey, setRefetchKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = auth?.currentUser;

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      if (!currentUser) return;
      const q = query(
        collection(db, "Reservations"),
        // where("uid", "==", currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      const reservations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(reservations);
      setLoading(false);
    };
    fetchReservations();
  }, [refetchKey]);

  const handleSelectedReservations = (id) => {
    setSelectedReservations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteSelected = async () => {
    const selectedReservationsArray = [...selectedReservations];
    await Promise.all(
      selectedReservationsArray.map((id) => deleteDoc(doc(db, "Reservations", id)))
    );
    setRefetchKey((prev) => prev + 1);
    return;
  };

  useEffect(() => {
    console.log(selectedReservations);
  }, [selectedReservations]);

  return (
    <div>
      <CustomBreadcrumbs title={"Parking Lots"} items={breadcrumbs}>
        {selectedReservations?.size > 0 || selectedReservations === "all" ? (
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
        selectedKeys={selectedReservations}
        onSelectionChange={setSelectedReservations}
      >
        <TableHeader>
          <TableColumn>DATE</TableColumn>
          <TableColumn>AMOUNT PAID</TableColumn>
          <TableColumn>START TIME</TableColumn>
          <TableColumn>END TIME</TableColumn>
        </TableHeader>
        <TableBody
          className="font-light"
          items={reservations}
          isLoading={loading}
          loadingContent={<Spinner />}
          emptyContent={!loading && "No reservation lots found"}
        >
          {(reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-semibold">
                {reservation?.date}
              </TableCell>
              <TableCell>
                { reservation?.amountPaid }
              </TableCell>
              <TableCell>
                <p>{ reservation?.startTime }</p>
              </TableCell>
              <TableCell>
                <p>{reservation?.endTime }</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
