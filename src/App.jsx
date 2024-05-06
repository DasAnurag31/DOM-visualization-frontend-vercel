import React, { useState, useEffect } from "react";
import TreeFlow from "./components/TreeFlow";
import FormComponent from "./components/FormComponent";
import { ReactFlowProvider } from "reactflow";
import Tooltip from "./components/Tooltip";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggleImage, setToggleImage] = useState(false);

  const onDataReceived = (responseData) => {
    setData(responseData);
  };

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setToggleImage(true);
      setInterval(() => {
        setToggleImage(true);
      }, 2 * 60 * 1000);
    }, 2 * 1000);

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  return (
    <div className="main-background min-h-[100dvh]">
      <FormComponent
        onDataReceived={onDataReceived}
        loading={loading}
        setLoading={setLoading}
      />
      <ReactFlowProvider>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <TreeFlow data={data?.body} />
        )}
      </ReactFlowProvider>

      <Tooltip toggleImage={toggleImage} setToggleImage={setToggleImage} />

      <div className="text-center italic font-semibold text-lg text-white p-4">
        Made with 💞 by{" "}
        <a
          className="underline font-bold"
          href="https://github.com/DasAnurag31"
        >
          Anurag Das
        </a>
      </div>
    </div>
  );
};

export default App;
