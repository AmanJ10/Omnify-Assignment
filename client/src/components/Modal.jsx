import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

function Modal({ isOpen, onClose, title, body, disabled }) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
        inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full 
              ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
            `}
          >
            <div
              className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg 
              relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              <div className="sticky top-0 flex items-center p-6 rounded-t justify-center relative border-b-[1px] bg-white z-10">
                <Button
                  label={<IoMdClose size={18} />}
                  onClick={handleClose}
                  className="p-1 absolute left-9 border-none bg-transparent hover:opacity-70"
                />
                <div className="text-3xl font-semibold">{title}</div>
              </div>

              <div className="relative p-6 flex-auto max-h-[80vh] overflow-y-auto">
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
