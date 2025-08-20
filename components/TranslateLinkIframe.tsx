import React, { forwardRef, memo, useImperativeHandle, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";

export interface TranslateLinkIframeRef {
  start: (url: string) => void;
}

export const TranslateLinkIframe = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    start: (url: string) => {
      setOpen(true);
      setUrl(url);
    },
  }));

  return (
    <Drawer open={open && !!url} onOpenChange={setOpen}>
      <DrawerContent className="container mx-auto flex h-[90vh] flex-col">
        <DrawerHeader>
          <DrawerTitle
            className="text-left"
            onClick={() => window.open(url ?? "", "_blank")}
          >
            {url}
          </DrawerTitle>
        </DrawerHeader>
        {url && (
          <iframe className="min-h-40 w-full flex-1 px-4" src={url ?? ""} />
        )}
        <DrawerFooter className="flex flex-row justify-between">
          <Button
            variant="secondary"
            onClick={() => window.open(url ?? "", "_blank")}
          >
            Open in a page
          </Button>
          <DrawerClose>
            <Button variant="destructive">Close Drawer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
TranslateLinkIframe.displayName = "TranslateLinkIframe";
