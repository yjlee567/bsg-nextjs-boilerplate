"use client";

import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const id = params["id"];
  const subId = params["sub-id"];

  return (
    <div>
      현재 경로: sub / ${id} / subsub /${subId}
    </div>
  );
};

export default page;
