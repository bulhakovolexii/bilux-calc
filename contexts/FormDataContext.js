"use client";

import { createContext, useContext, useState } from "react";

const FormDataContext = createContext(undefined);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // initial data
  });

  return (
    <FormDataContext.Provider value={[formData, setFormData]}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
