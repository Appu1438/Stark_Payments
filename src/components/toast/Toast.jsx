import React, { useEffect } from "react";
import "./toast.css";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast-container ${type}`}>
      <span className="toast-message">{message}</span>
    </div>
  );
}
