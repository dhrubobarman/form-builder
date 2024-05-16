"use client";
import React, { useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

type FormSubmitComponentProps = {
  formUrl: string;
  content: FormElementInstance[];
};

const FormSubmitComponent = ({
  formUrl,
  content,
}: FormSubmitComponentProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [key, setkey] = useState<number>(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransitoin] = useTransition();

  const validateForm = () => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const isValid = FormElements[field.type].validate(field, actualValue);
      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }
    return Object.keys(formErrors.current).length === 0;
  };

  const setFormValues = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = async () => {
    formErrors.current = {};
    const valid = validateForm();
    if (!valid) {
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      setkey(new Date().getTime());
      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "!Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl dark:shadow-primary rounded">
          <h1 className=" text-2xl">Form Submitted</h1>
          <p className=" text-muted-foreground">
            Thank you for submitting the form. You can close this page now.
          </p>
          <Button onClick={() => window.close()}>Close</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full h-[calc(100vh-53px)] overflow-y-auto items-center justify-center p-8">
      <div
        key={key}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl dark:shadow-primary rounded"
      >
        {content.map((element) => {
          const FormComponent = FormElements[element.type].formComponent;
          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              setFormValues={setFormValues}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id] || ""}
            />
          );
        })}
        <Button
          className="mt-8 gap-2"
          onClick={() => {
            startTransitoin(submitForm);
          }}
          disabled={pending}
        >
          {!pending ? (
            <>
              <HiCursorClick />
              Submit
            </>
          ) : (
            <ImSpinner2 className="animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
