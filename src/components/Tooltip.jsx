import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Tooltip = ({ toggleImage, setToggleImage }) => {
  return (
    <div className="float-right">
      <div
        className={`absolute bottom-2 right-2 xl:right-10 ${
          toggleImage ? "block" : "hidden"
        }`}
      >
        <div className="relative font-semibold right-48 top-20 xl:right-56 xl:top-28 rounded-md w-72 xl:w-80 h-60 bg-slate-200 p-2 text-center flex flex-col items-center justify-between">
          <p className="font-bold">नमस्ते 🙏 Hello !!, </p>
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
        <img className="float-end w-52 xl:w-80" src="../assets/boy.png" alt="It's Me, Hi!!!" />
      </div>
    </div>
  );
};

export default Tooltip;
