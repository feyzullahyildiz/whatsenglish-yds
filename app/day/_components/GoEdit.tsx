"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import React from "react";

export const GoEdit = ({ dayNumber }: { dayNumber: number }) => {
  const user = useUser();
  if (!user) {
    return null;
  }
  return (
    <Link href={`/day/${dayNumber}/edit`}>
      <Button>Edit</Button>
    </Link>
  );
};
