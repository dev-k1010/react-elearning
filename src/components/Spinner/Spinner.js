import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

export default function Spinner() {
  const [showSpinner, setShowSpinner] = useState(false);
  const isLoading = useSelector((state) => state.spinnerSlice.spinner);
  console.log("🙂 ~ Spinner ~ isLoading:", isLoading)
  useEffect(() => {
    setShowSpinner(isLoading);
  }, [isLoading]);
  return showSpinner ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 500000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader color="#36d7b7" speedMultiplier={1} size={20} />
    </div>
  ) : null;
}
