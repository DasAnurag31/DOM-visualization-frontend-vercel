import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";

const ModalContent = ({ closeModal, data }) => {
  return (
    <div
      className="modal w-[80%] h-[60%] p-10 "
      style={{ backgroundColor: "#1d1d1b" }}
    >
      <button className="float-end" onClick={closeModal}>
        <FaWindowClose />
      </button>
      <h2 className="font-bold text-xl my-4">{data.label}</h2>
      <div>
        <h3 className="font-semibold my-1 text-lg flex items-center gap-2">
          Content <FaArrowTurnDown />
        </h3>
        <p className="p-2 font-medium italic">{data.content}</p>
      </div>
    </div>
  );
};

export default ModalContent;
