import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className={`${cn(
        "flex flex-col gap-2 size-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary cursor-grabbing"
      )}`}
      variant={"outline"}
    >
      <Icon className={"size-8 text-primary"} />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;
  return (
    <Button
      className={"flex flex-col gap-2 size-[120px] cursor-grabbing"}
      variant={"outline"}
    >
      <Icon className={"size-8 text-primary"} />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;
