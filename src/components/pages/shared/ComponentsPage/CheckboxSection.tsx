"use client";
import Section from "@/components/shared/Section";
import { Checkbox } from "@/components/ui";
import { useState } from "react";

const CheckboxSection = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Section title="Checkbox">
      <div>
        <div className="flex gap-4">
          <Checkbox id="terms" checked={checked} variant={"default"} onChange={() => {
            setChecked(!checked);
          }} />
          <Checkbox id="terms" checked={checked} variant={"primary"} onChange={() => {
            setChecked(!checked);
          }} />
          <Checkbox id="terms" checked={checked} variant={"info"} onChange={() => {
            setChecked(!checked);
          }} />
        </div>
      </div>
    </Section>
  );
};

export default CheckboxSection;
