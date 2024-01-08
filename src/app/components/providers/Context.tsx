"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import getWindowSize from "@/app/helpers/getWindowSize";

type ContextType = {
  windowSize: { innerWidth: number; innerHeight: number };
  setWindowSize: React.Dispatch<
    React.SetStateAction<{ innerWidth: number; innerHeight: number }>
  >;
};

export const Context = createContext<ContextType>(
  null as unknown as ContextType
);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Context.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
