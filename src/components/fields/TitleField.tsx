"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createElement, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { LuHeading } from "react-icons/lu";
import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

type FontWeights =
  | "font-thin"
  | "font-extralight"
  | "font-light"
  | "font-normal"
  | "font-medium"
  | "font-semibold"
  | "font-bold"
  | "font-extrabold"
  | "font-black";

const type: ElementsType = "TitleField";
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const fontWeights = [
  "font-thin",
  "font-extralight",
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
  "font-black",
];

const extraAttributes: {
  title: string;
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  alignment: "text-left" | "text-center" | "text-right";
  fontWeight: FontWeights;
} = {
  title: "Title field",
  heading: "h4",
  alignment: "text-left",
  fontWeight: "font-normal",
};

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: LuHeading,
    label: "Title field",
  },
  designerComponent: (props) => <DesignerComponent {...props} />,
  formComponent: (props) => <FormComponent {...props} />,
  propertiesComponent: (props) => <PropertiesComponent {...props} />,
  validate: (): boolean => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { title, alignment, heading, fontWeight } = element.extraAttributes;
  const fontSizes = [
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-base",
  ];
  const fontSize = fontSizes[headings.indexOf(heading)];
  const className = cn(`text-xl`, alignment, fontSize, fontWeight);

  const htmlElement = createElement(heading, { className }, title);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground ">Title field</Label>
      {htmlElement}
    </div>
  );
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
  heading: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
  alignment: z.enum(["text-left", "text-center", "text-right"]),
  fontWeight: z.enum([
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black",
  ]),
});

type PropertiesFormSchema = z.infer<typeof propertiesSchema>;

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;

  const form = useForm<PropertiesFormSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "all",
    defaultValues: element.extraAttributes,
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = useCallback(
    (values: PropertiesFormSchema) => {
      updateElement(element.id, {
        ...element,
        extraAttributes: values,
      });
    },
    [element, updateElement]
  );

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"heading"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Heading</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="h1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {headings.map((heading) => (
                    <SelectItem value={heading} key={heading}>
                      {heading}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"fontWeight"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Font Thickness</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fontWeights.map((weight) => (
                    <SelectItem
                      value={weight}
                      key={weight}
                      className=" capitalize"
                    >
                      {weight.split("-")[1]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"alignment"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Alignment</FormLabel>
              <FormControl>
                <Tabs value={field.value} onValueChange={field.onChange}>
                  <TabsList className="border">
                    <TabsTrigger value={"text-left"}>
                      <FaAlignLeft className="h-[1.2rem] w-[1.2rem]" />
                    </TabsTrigger>
                    <TabsTrigger value={"text-center"}>
                      <FaAlignCenter className="h-[1.2rem] w-[1.2rem]" />
                    </TabsTrigger>
                    <TabsTrigger value={"text-right"}>
                      <FaAlignRight className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { title, alignment, heading, fontWeight } = element.extraAttributes;
  const fontSizes = [
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-base",
  ];
  const fontSize = fontSizes[headings.indexOf(heading)];
  const className = cn(`text-xl`, alignment, fontSize, fontWeight);

  const htmlElement = createElement(heading, { className }, title);

  return <>{htmlElement}</>;
};
