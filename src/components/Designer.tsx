"use client";
import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import idGenerator from "@/lib/idGenerator";

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver ? "ring-2 ring-primary" : ""
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary"></div>
            </div>
          )}
          {elements.length > 0 ? (
            <div className="flex flex-col text-background w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const DesignerElement = FormElements[element.type].designerComponent;

  return <DesignerElement placeholder="hello" />;
};
