import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface RModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closable?: boolean;
}

const RModal = ({
  title,
  children,
  isOpen,
  closable = false,
  onClose,
}: RModalProps): React.ReactElement => {
  // const [open, setOpen] = React.useState(false);

  const onClickOutside = (e: Event) => !closable && e.preventDefault();

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      {/* <Dialog.Trigger>Open</Dialog.Trigger> */}
      <Dialog.Portal>
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/75 transition-opacity data-[state=open]:animate-fade-in" />
          <Dialog.Content
            className={`fixed mx-20 grid max-h-[calc(100%-20px)] w-[calc(100%-20px)] overflow-y-auto overflow-x-hidden rounded-md bg-white opacity-100 data-[state=open]:animate-fade-in sm:max-w-[480px]`}
            onPointerDownOutside={onClickOutside}
            onInteractOutside={onClickOutside}
            onEscapeKeyDown={onClickOutside}
          >
            <Dialog.Title className="font-primary text-secondary flex bg-gray-200 px-14 py-8 text-2xl font-light">
              {title}
              <button
                className="absolute right-5"
                aria-label="Close modal"
                onClick={onClose}
              >
                X
              </button>
            </Dialog.Title>
            <Dialog.Description asChild className="p-5 sm:px-14 sm:py-8">
              {children}
            </Dialog.Description>
            {/* <Dialog.Close>close</Dialog.Close> */}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RModal;
