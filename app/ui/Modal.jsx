import {
  Button,
  Modal as NextModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Spinner,
} from "@nextui-org/react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = ({
  stateProps,
  title,
  children,
  onSubmit,
  loading = false,
  size = "md",
  Icon = null, // This is for the Icon in the ModalHeader
  buttons = {
    action: {
      text: "Save",
      loadingText: "Saving",
      icon: <MdOutlineSaveAlt className="w-5 h-5" />, // This is the icon you want to render
    },
    close: {
      text: "Close",
    },
  },
  backdrop = "opaque",
  onClose = () => {},
}) => {
  const { isOpen, onOpenChange } = stateProps;

  // Extracting the action icon for rendering
  const ActionIcon = buttons?.action?.icon; // Make sure this is a component, not JSX.

  return (
    <NextModal
      backdrop={backdrop}
      size={size}
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex items-center space-x-2">
          {Icon && <Icon className="w-5 h-5" />}
          <p>{title}</p>
        </ModalHeader>
        <ModalBody className="overflow-hidden gap-0">{children}</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onClick={() => {
              stateProps.onClose(); // This is the function to close the modal
              onClose(); // This is the function passed as a prop for the action to happen when the modal is closed
            }}
            className="flex items-center"
          >
            <IoCloseCircleSharp className="w-5 h-5" />
            <p>Close</p>
          </Button>
          {buttons.action ? (
            <button
              onClick={onSubmit}
              className="flex items-center hover:bg-[#F5F5F6] px-4 py-2 rounded-xl space-x-1 duration-300"
            >
              {loading ? <Spinner className="mr-2" size="sm" /> : ActionIcon}
              <p className="text-sm font-semibold">
                {loading ? buttons.action.loadingText : buttons.action.text}
              </p>
            </button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </NextModal>
  );
};

export default Modal;
