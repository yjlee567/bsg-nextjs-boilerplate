import { useState } from "react";
import Section from "@/components/shared/Section";
import { Switch } from "@/components/ui";

const SwitchSection = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <Section title="switch">
      <Switch checked={checked} variant={"default"} onChangeChecked={handleChange} />
      <Switch checked={checked} variant={"primary"} onChangeChecked={handleChange} />
      <Switch checked={checked} disabled variant={"info"} onChangeChecked={handleChange} />
      <Switch disabled onChangeChecked={handleChange} />
    </Section>
  );
};

export default SwitchSection;
