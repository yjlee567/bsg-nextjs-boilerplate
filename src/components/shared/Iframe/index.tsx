"use client";

import { FC } from "react";

interface Props {
  src: string;
  title: string;
}

const Iframe: FC<Props> = ({ src = "http://localhost:3000", title }) => {
  return (
    <div className="h-full">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title={title}
      ></iframe>
    </div>
  );
};

export default Iframe;
