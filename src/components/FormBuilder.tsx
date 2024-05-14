"use client";
import { DndContext } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import Designer from "./Designer";
import DragOverlyWrapper from "./DragOverlyWrapper";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";

type FormBuilderProps = {
  form: Form;
};

const FormBuilder = ({ form }: FormBuilderProps) => {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className=" truncate font-medium">
            <span className=" text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/texture.svg)] dark:bg-[url(/texture-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlyWrapper />
    </DndContext>
  );
};

export default FormBuilder;
