import { ReactNode, FC } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils/styles";

interface Props {
  title?: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  gap?: 1 | 2 | 3 | 4;
  children?: ReactNode;
  className?: string;
}

const Widget: FC<Props> = ({
  title,
  description,
  href,
  hrefLabel = "View All",
  gap = 2,
  children,
  className,
}) => {
  const gapStyle = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
  };

  return (
    <div
      className={cn(
        `flex flex-col min-w-0 ${gapStyle[gap]} rounded-lg border shadow-sm p-6`,
        className,
      )}
    >
      {(title || description) && (
        <div className="flex gap-1 items-center">
          <div className="flex-1 grid gap-1">
            {title && <h3 className="text-2xl font-medium leading-none tracking-tight">{title}</h3>}
            {description && <p className="text-sm text-main-gray">{description}</p>}
          </div>
          {href && (
            <Link href={href} className="">
              <Button className="gap-1">
                {hrefLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      )}
      {children && children}
    </div>
  );
};

export default Widget;
