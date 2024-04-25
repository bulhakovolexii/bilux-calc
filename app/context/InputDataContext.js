"use client";

import { createContext, useContext, useState } from "react";

const InputDataContext = createContext(undefined);

export const InputDataProvider = ({ children }) => {
  const [inputData, setInputData] = useState({
    // city: "Харків",
    // terrain: "B",
    // purpose: "Багатоквартирні будинки, гуртожитки",
    // heatCapacityClass: "Середній",
    // tightness: "Герметична",
    // typeAndCondition: "Утеплені органічними матеріалами в задовільному стані",
    // buildingWidth: "44.29",
    // buildingLength: "14.49",
    // floorHeight: "3",
    // numbersOfFloors: "9",
  });

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
