"use client";

import ButtonSection from "./ButtonSection";
import CheckboxSection from "./CheckboxSection";
import TableSection from "./TableSection";
import InputSection from "./InputSection";
import SelectSection from "./SelectSection";
import ActionButtonSection from "./ActionButtonSection";
import SwitchSection from "./SwitchSection";

const ComponentsPage = () => {
  return (
    <div className="flex flex-col gap-4 min-h-0">
      <ButtonSection />
      <ActionButtonSection />
      <div className="grid grid-cols-2 gap-4">
        <CheckboxSection />
        <SwitchSection />
      </div>
      <InputSection />
      <SelectSection />
      <TableSection />
    </div>
  );
};

export default ComponentsPage;
