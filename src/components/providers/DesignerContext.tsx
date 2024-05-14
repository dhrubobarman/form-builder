"use client";
import React, { ReactNode, useState } from "react";
import { FormElementInstance } from "../FormElements";
import { createContext } from "react";

type DesignerContextProps = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextProps | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  return (
    <DesignerContext.Provider value={{ elements, addElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
