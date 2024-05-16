import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

const SubmitPage = async ({
  params: { formUrl },
}: {
  params: {
    formUrl: string;
  };
}) => {
  const form = await GetFormContentByUrl(formUrl);
  if (!form) throw new Error("Form not found");
  const formContent = JSON.parse(form) as FormElementInstance[];

  return <FormSubmitComponent formUrl={formUrl} content={formContent} />;
};

export default SubmitPage;
