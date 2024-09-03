import { FC, ReactNode } from "react";

interface FormWrapperProps {
  children?: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <div className="text-sm grid gap-2 pl-8 pr-16 [&>*]:min-h-10">{children && children}</div>;
};

interface FormLineProps {
  children?: ReactNode;
}

const FormLine: FC<FormLineProps> = ({ children }) => {
  return <div className="grid grid-cols-[160px_300px] items-center">{children && children}</div>;
};

export { FormWrapper, FormLine };
