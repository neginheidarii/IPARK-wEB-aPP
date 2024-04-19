import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../../lib/firebase/firebase";
import { Divide, ParkingMeterIcon } from "lucide-react";
import { FaParking } from "react-icons/fa";
import { Divider } from "@nextui-org/react";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default async function ParkingLotPage({ params }) {
  if (!params.id) {
    return <div>Invalid Parking Lot ID</div>;
  }
  let parkingLot;
  const docRef = doc(db, "ParkingLots", params?.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    parkingLot = docSnap.data();
  } else {
    return <div>Parking Lot not found</div>;
  }
  return (
    <div>
      <section className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
        <FaParking className="min-w-[200px] flex items-start" size={220} />
        <div className="space-y-4 sm:py-4 sm:px-4">
          <h1 className="text-2xl font-bold">{parkingLot?.name ?? 'Parking Lot'}</h1>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aut ea
            sed tenetur quasi mollitia sit dignissimos laudantium id qui
            temporibus illum at explicabo dicta perspiciatis adipisci quidem,
            suscipit debitis.
          </p>
          <hr class="h-0.5 border-t bg-neutral-300 dark:bg-white/10" />
          <div className="flex flex-row items-center gap-8 ">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-light">Available Spaces</p>
              <p className="text-xl font-bold">{parkingLot?.capacity ?? 'N/A'} <span className="font-normal text-sm text-gray-600">spots</span></p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-light">Rate</p>
              <p className="text-xl font-bold">{parkingLot?.rate} <span className="font-normal text-sm text-gray-600">$/h</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
