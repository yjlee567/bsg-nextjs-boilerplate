import { ChangeEvent, useState } from "react";
import Section from "@/components/shared/Section";
import { Input, InputSearch, InputWithLabel, Textarea } from "@/components/ui/";

const InputSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  return (
    <Section title="Input & Textarea">
      <div className="flex gap-2 items-end">
        <Input placeholder="기본 Input" />
        <InputWithLabel label="label" placeholder="Label 있는 Input" />
        <InputSearch placeholder="검색 버튼 있는 Input" />
      </div>
      <div className="flex gap-2 items-center">
        <Input
          value={inputValue}
          onChange={handleChangeInput}
          onClear={() => setInputValue("")}
          className="basis-1/2 shrink-0"
        />
        <p>
          <span>Input 입력값: </span>
          <span>{inputValue}</span>
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <Textarea
          value={textareaValue}
          onChange={handleChangeTextarea}
          className="basis-1/2 shrink-0"
        />
        <p>
          <span>Textarea 입력값: </span>
          <span>{textareaValue}</span>
        </p>
      </div>
    </Section>
  );
};

export default InputSection;
