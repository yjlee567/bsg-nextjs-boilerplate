import Section from "@/components/shared/Section";
import { Button } from "@/components/ui";

const ButtonSection = () => {
  const gohome = () => {};
  return (
    <Section title="Button">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={gohome}>Primary</Button>
        <Button variant="muted">Muted</Button>
        <Button variant="info">Info</Button>
        <Button variant="success">Success</Button>
        <Button variant="error">Error</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="text">Text</Button>
        <Button variant="outline" size={"default"}>
          Outline
        </Button>
        <Button variant="outline" size={"icon"}>
          icon
        </Button>
        <Button variant="outline" size={"lg"}>
          lg
        </Button>
        <Button variant="outline" size={"sm"}>
          sm
        </Button>
        <Button loading>Loading</Button>
      </div>
    </Section>
  );
};

export default ButtonSection;
