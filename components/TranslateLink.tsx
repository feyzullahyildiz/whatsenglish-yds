import React from "react";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  link: string;
  name: string;
  icon: React.ReactNode;
  onClick?: (url: string) => void;
}
export const TranslateLink = ({ name, link, icon, onClick }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button asChild size="icon" variant="outline">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onClick) {
                e.preventDefault();
                onClick(link);
              }
            }}
          >
            {icon}
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
