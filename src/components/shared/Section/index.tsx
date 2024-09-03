import { FC, ReactNode } from "react";
import { cn } from "@/utils/styles";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Section: FC<Props> = ({ title = "", children, className }) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-6 rounded-lg bg-card text-card-foreground shadow-sm p-6 bg-main-white",
        className,
      )}
    >
      {title && <h2 className="text-xl font-medium leading-none tracking-tight">{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
