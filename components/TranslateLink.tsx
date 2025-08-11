import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  link: string;
  name: string;
  icon: React.ReactNode;
}
export const TranslateLink = ({ name, link, icon }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {icon}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
