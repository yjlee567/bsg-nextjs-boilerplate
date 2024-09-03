"use client";

import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();

  return <div>현재 경로: sub / {id}</div>;
};

export default page;
