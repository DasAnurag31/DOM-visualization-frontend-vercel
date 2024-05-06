import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { tagBorderColors } from "./data";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaArrowTurnDown } from "react-icons/fa6";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1d1d1b",
    color: "#fff",
    width: "80%",
    height: "60%",
    borderRadius: "2rem",
  },
};

const DarkNode = ({ data, isConnectable }) => {
  // Border Colour logic
  const tagMatch = data.label.match(/<(.*?)\/?>/);
  const tag = tagMatch ? tagMatch[1].toUpperCase() : "";
  const borderColorClass = tagBorderColors[tag] || "border-white-500";

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div id="root-modal">
      <div
        className={`btn-grad border-2 ${borderColorClass} z-0`}
        onClick={openModal}
      >
        <Handle
          type="target"
          position={Position.Top}
          id="th"
          isConnectable={isConnectable}
        />
        <div className="font-medium text-md tracking-wider">{data.label}</div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="bh"
          isConnectable={isConnectable}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="My Modal"
      >
        <div className="flex justify-between">
          <h2 className="font-bold text-xl my-4">{data.label}</h2>
          <button className="float-end text-3xl pr-2" onClick={closeModal}>
            <AiOutlineCloseCircle />
          </button>
        </div>

        <hr className="w-[90%]" />
        <div>
          <h3 className="font-semibold my-1 text-lg flex items-center gap-2">
            Content <FaArrowTurnDown />
          </h3>
          <p className="p-2 font-medium italic">{data.content} </p>
        </div>
      </Modal>
    </div>
  );
};

export default DarkNode;
