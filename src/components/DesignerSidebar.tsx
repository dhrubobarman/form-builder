import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
import useDesigner from "./hooks/useDesigner";

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow-0 gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement ? <FormElementSidebar /> : <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
