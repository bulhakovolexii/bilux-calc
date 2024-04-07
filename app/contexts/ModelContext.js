"use client";

import { createContext, useContext, useState } from "react";

const ModelContext = createContext(undefined);

export const ModelProvider = ({ children }) => {
  const [modelData, setModelData] = useState({
    // initial data
  });

  return (
    <ModelContext.Provider value={[modelData, setModelData]}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
