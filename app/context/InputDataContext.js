"use client";

import { createContext, useContext, useState } from "react";
import testInputData from "./testInputData";

const InputDataContext = createContext(undefined);

export const InputDataProvider = ({ children }) => {
  const [inputData, setInputData] = useState(testInputData);

  const updateInputData = (newValue) => {
    setInputData({ ...inputData, ...newValue });
  };

  return (
    <InputDataContext.Provider value={{ inputData, updateInputData }}>
      {children}
    </InputDataContext.Provider>
  );
};

export const useInputData = () => {
  const context = useContext(InputDataContext);
  if (!context) {
    throw new Error("useInputData must be used within a InputDataProvider");
  }
  return context;
};
