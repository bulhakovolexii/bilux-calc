"use client";

import { useEffect } from "react";

const useUnsavedChanges = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Modern browsers require the value to be an empty string
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useUnsavedChanges;
