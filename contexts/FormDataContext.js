"use client";

import { createContext, useContext, useState } from "react";

const FormDataContext = createContext(undefined);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // initial data
  });
  const [activeStep, setActiveStep] = useState(0);

  const value = {
    formData,
    setFormData,
    activeStep,
    setActiveStep,
  };
  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
