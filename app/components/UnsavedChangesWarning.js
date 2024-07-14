"use client";

import { useEffect } from "react";

const UnsavedChangesWarning = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Современные браузеры требуют, чтобы значение было пустой строкой
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default UnsavedChangesWarning;
