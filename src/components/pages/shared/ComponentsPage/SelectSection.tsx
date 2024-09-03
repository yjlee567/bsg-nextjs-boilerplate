import { useState } from "react";
import Section from "@/components/shared/Section";
import { SelectBox } from "@/components/ui";

const selectItems = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

const SelectSection = () => {
  const [currentItem, setCurrentItem] = useState(selectItems[0]);

  const handleChange = (value: string) => {
    setCurrentItem(selectItems.find(item => item.value === value) || selectItems[0]);
  };

  return (
    <Section title="Select">
      <div className="flex gap-2 items-end">
        <SelectBox currentItem={currentItem} list={selectItems} onValueChange={handleChange} />
      </div>
    </Section>
  );
};

export default SelectSection;
