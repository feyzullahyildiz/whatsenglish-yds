"use client";

import React, { useState } from "react";

import { createDay } from "@/actions/createDay";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [value, setValue] = useState(0);
  const onCreate = async () => {
    createDay(value);
  };
  return (
    <div className="mx-auto container">
      <h1 className="text-2xl font-bold mb-4">Gün Oluştur</h1>

      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.valueAsNumber)}
      />
      <br />
      <Button onClick={onCreate}>Oluştur</Button>
    </div>
  );
}
