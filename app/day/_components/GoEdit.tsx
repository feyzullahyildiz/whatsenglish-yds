"use client";

import React from "react";

import Link from "next/link";

import { useUser } from "@/hooks/useUser";

import { Button } from "@/components/ui/button";

export const GoEdit = ({ dayNumber }: { dayNumber: number }) => {
  const user = useUser();
  if (!user) {
    return null;
  }
  return (
    <Link href={`/day/${dayNumber}/edit`}>
      <Button size="sm">Go Edit Page</Button>
    </Link>
  );
};
