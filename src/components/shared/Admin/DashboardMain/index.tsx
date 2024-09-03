import { Children, FC, Fragment, ReactNode } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui";

interface Props {
  resizeDirection?: "horizontal" | "vertical";
  /**
   * The ratio of the resizable panel.
   * ex) "1:2", "1:1", "2:1:1"
   */
  ratio?: string;
  children?: ReactNode | ReactNode[];
}

const DashboardMain: FC<Props> = ({ resizeDirection, ratio, children }) => {
  const ratioMap = ratio?.split(":").map(Number);

  const getRatio = (totalLength: number, currIndex: number) => {
    if (!ratioMap) return 100 / totalLength;

    const totalRatio = ratioMap.reduce((acc, cur) => acc + cur, 0);
    const currentRatio = ratioMap[currIndex];

    return currentRatio ? (currentRatio / totalRatio) * 100 : 100 / totalLength;
  };

  const render = () => {
    if (!children) {
      return <></>;
    }

    const childrenLength = Children.count(children);
    if (resizeDirection) {
      return (
        <ResizablePanelGroup direction={resizeDirection} className="w-full h-full gap-4">
          {Children.map(children, (child, index) => {
            return (
              <Fragment key={index}>
                <ResizablePanel
                  order={index + 1}
                  defaultSize={getRatio(childrenLength, index)}
                  minSize={100 / (childrenLength + 2)}
                  className=""
                >
                  {child}
                </ResizablePanel>
                {index < childrenLength - 1 && <ResizableHandle withHandle />}
              </Fragment>
            );
          })}
        </ResizablePanelGroup>
      );
    }

    return <>{children}</>;
  };

  return <div className="grow min-h-0">{render()}</div>;
};

export default DashboardMain;
