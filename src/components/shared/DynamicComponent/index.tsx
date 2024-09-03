"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { NotFoundPage } from "@/components/pages/shared";
import { LoadingBounce } from "@/components/ui";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="h-16 flex items-center justify-center bg-white rounded-md animate-pulse">
        <LoadingBounce />
      </div>
      <div className="grow flex items-center justify-center bg-white rounded-md animate-pulse">
        <LoadingBounce />
      </div>
      <div className="grow flex items-center justify-center bg-white rounded-md animate-pulse">
        <LoadingBounce />
      </div>
    </div>
  );
};

const loadComponent = (path: string) => {
  return dynamic(
    () =>
      import(`../../pages/${path}`).catch(err => {
        console.error(err);
        return () => <NotFoundPage />;
      }),
    { ssr: false, loading: () => <LoadingSkeleton /> },
  );
};

interface Props {
  path: string;
}

const DynamicComponent: FC<Props> = ({ path }) => {
  const Component = loadComponent(path);
  return <Component />;
};

export default DynamicComponent;
