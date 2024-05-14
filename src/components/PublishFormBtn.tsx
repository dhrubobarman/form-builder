import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormBtn = () => {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-red-400 to-orange-400">
      <MdOutlinePublish className="size-4" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
