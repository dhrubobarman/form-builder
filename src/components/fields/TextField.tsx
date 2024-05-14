"use client";
import React from "react";
import { ElementsType, FormElement } from "../FormElements";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      type: "text",
      label: " Text field",
      required: false,
      placeholder: "Value here...",
    },
  }),
  designerButtonElement: {
    icon: MdTextFields,
    label: "Text field",
  },
  designerComponent: (props) => <input type="text" {...props} />,
  formComponent: (props) => <input type="text" {...props} />,
  propertiesComponent: (props) => <input type="text" {...props} />,
};
