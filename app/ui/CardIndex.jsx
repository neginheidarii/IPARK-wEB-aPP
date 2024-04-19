import { Button } from "@nextui-org/react";
import { TrashIcon } from "lucide-react";
import { FaPenToSquare } from "react-icons/fa6";

const Card = ({
  title,
  subtitle,
  children,
  className,
  Icon,
  Img,
  TopRightContainer,
  iconClasses,
  occupied,
  onDelete = () => {},
}) => {
  return (
    <div
      className={`bg-[#cddff2] rounded shadow-sm p-8 relative flex flex-col space-y-4 ${className}`}
    >
      <div className="flex justify-between items-start">
        {TopRightContainer && (
          <section className="flex space-x-2">{TopRightContainer}</section>
        )}
      </div>
      <div className="mx-auto rounded overflow-hidden">
        <img src="/parkTOP-640x428.jpg" alt="img" />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <h4 className="text-sm text-gray-600">{occupied ? 'Occupied' : 'Available'}</h4>
      </div>

      <div className="flex justify-end items-end">
        <Button
          onClick={onDelete}
          className="bg-black flex items-center justify-center text-white rounded-xl hover:bg-gray-800"
          variant="flat"
          color="danger"
        >
          <TrashIcon />
          <p>Delete</p>
        </Button>
      </div>
    </div>
  );
};

export default Card;
