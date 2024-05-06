import React, { useState } from "react";
import axios from "axios";

const FormComponent = ({ onDataReceived, loading, setLoading }) => {
  const [url, setUrl] = useState("https://www.google.com");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/geturl",
        { url }
      );
      onDataReceived(response.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
      setUrl("");
    }
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="">
      <h1 className="text-3xl text-white text-center py-4 font-semibold ">
        DOM Tree Visualizer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-5 max-w-xl mx-auto mb-4"
      >
        <div className="inputbox w-[80%]">
          <input type="url" value={url} onChange={handleUrlChange} required />
          <span>URL</span>
          <i></i>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-[25%] btn-grad-panel font-semibold text-lg"
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
