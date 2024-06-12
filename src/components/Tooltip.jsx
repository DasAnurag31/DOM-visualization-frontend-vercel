import React from "react";
import boyImage from "../assets/boy.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Tooltip = ({ toggleImage, setToggleImage }) => {
  return (
    <div className="float-right">
      <div
        className={`fixed bottom-2 right-2 xl:right-10 ${
          toggleImage ? "block" : "hidden"
        }`}
      >
        <div className="relative font-semibold xl:right-56 xl:top-28 md:right-48 md:top-20 right-28 top-20 rounded-md xl:w-80 md:w-72 md:h-60 bg-slate-200 p-1 md:p-2 text-center flex flex-col items-center justify-between w-40 text-sm md:text-lg">
          <p className="font-bold ">नमस्ते 🙏 Hello !!, </p>
          <p>
            If the nodes in tree CLASH, try zooming and then 'click' Beautify.
          </p>
          <p>I am still working on this, thanks for your patience.</p>
          <p>
            Made with ❣️ by{" "}
            <a
              className="font-bold underline"
              href="https://github.com/DasAnurag31"
            >
              Anurag Das
            </a>
          </p>
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => setToggleImage(false)}
          >
            Close <AiOutlineCloseCircle />
          </button>
        </div>
        <img
          className="float-end md:w-52 xl:w-80 w-40"
          src={boyImage}
          alt="It's Me, Hi!!!"
        />
      </div>
    </div>
  );
};

export default Tooltip;
