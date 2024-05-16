"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsTextParagraph } from "react-icons/bs";
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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

const type: ElementsType = "ParagraphField";

const extraAttributes: {
  text: string;
  alignment: "text-left" | "text-center" | "text-right";
} = {
  text: "Paragraph field",
  alignment: "text-left",
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: BsTextParagraph,
    label: "Paragraph field",
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
  const { text, alignment } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground ">Paragraph field</Label>
      <p className={cn(alignment)}>{text}</p>
    </div>
  );
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(50),
  alignment: z.enum(["text-left", "text-center", "text-right"]),
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
    mode: "onBlur",
    defaultValues: element.extraAttributes,
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchema) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: values,
    });
  };

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
          name={"text"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Paragraph</FormLabel>
              <FormControl>
                <Textarea
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
  const { text, alignment } = element.extraAttributes;
  return <p className={cn(alignment)}>{text}</p>;
};
