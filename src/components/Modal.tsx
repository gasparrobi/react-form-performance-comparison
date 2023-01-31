import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useTransition, animated, config } from "react-spring";

interface RModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closableOnClickOutside?: boolean;
}

const RModal = ({
  title,
  children,
  isOpen,
  closableOnClickOutside = true,
  onClose,
}: RModalProps): React.ReactElement => {
  const [open, setOpen] = useState(isOpen);

  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
    onRest: () => {
      if (!open) onClose();
    },
  });

  const onClickOutside = (e: Event) =>
    !closableOnClickOutside && e.preventDefault();

  useEffect(() => {
    const currentlyFocusedElem = document.activeElement as HTMLElement;

    return () => {
      currentlyFocusedElem?.focus();
    };
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
      {transitions((styles, item) =>
        item ? (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <Dialog.Overlay
              forceMount
              asChild
              className="fixed inset-0 bg-black/75 transition-opacity "
            >
              <animated.div
                style={{
                  opacity: styles.opacity,
                }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              forceMount
              asChild
              className={`fixed mx-20 grid max-h-[calc(100%-20px)] w-[calc(100%-20px)] overflow-y-auto overflow-x-hidden rounded-md bg-white opacity-100  sm:max-w-[480px]`}
              style={styles}
              onPointerDownOutside={onClickOutside}
              onInteractOutside={onClickOutside}
              onEscapeKeyDown={onClickOutside}
            >
              <animated.div
                style={{
                  opacity: styles.opacity,
                }}
              >
                <Dialog.Title className="font-primary text-secondary flex bg-gray-200 px-14 py-8 text-2xl font-light">
                  {title}
                  <button
                    className="absolute right-5"
                    aria-label="Close modal"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </Dialog.Title>
                <Dialog.Description asChild className="p-5 sm:px-14 sm:py-8">
                  {children}
                </Dialog.Description>
              </animated.div>
            </Dialog.Content>
          </div>
        ) : null
      )}
    </Dialog.Root>
  );
};

export default RModal;
