"use client";

import mockData from "../model/mockData";

const { createContext, useState, useContext } = require("react");

const InputDataContext = createContext();

export function InputDataProvider({ children }) {
  const InitialInputData = mockData; // Delete after testing

  const [inputData, setInputData] = useState(InitialInputData);
  return (
    <InputDataContext.Provider value={[inputData, setInputData]}>
      {children}
    </InputDataContext.Provider>
  );
}

export function useInputData() {
  const context = useContext(InputDataContext);
  if (context === undefined) {
    throw new Error("useInputData must be used within a InputDataProvider");
  }
  return context;
}
