"use client";

import { Button } from "@/components/ui";
import { useAlert, useBasePath } from "@/hooks";
import { useRouter } from "next/navigation";

interface Props {}

interface Error {
  status: number;
  message: string;
}

const useApiError = () => {
  const router = useRouter();
  const { goLoginPage, basePath } = useBasePath();
  const { addAlert } = useAlert();

  const onHandleError = (error: Error, options?: { message?: string; onRetry?: () => void }) => {
    const retryAction = options?.onRetry ? (
      <Button variant={"ghost"} size={"auto"} onClick={options?.onRetry}>
        다시 시도
      </Button>
    ) : null;

    switch (error.status) {
      case 400:
        addAlert({
          status: "error",
          message: options?.message || error.message || "Bad Request",
          action: retryAction,
        });
        return;
      case 401:
        goLoginPage();
        return "Not Found";
      case 403:
        router.push(`${basePath}/403`);
        return "Forbidden";
      case 404:
        router.push(`${basePath}/404`);
        return "Not Found";
      case 500:
        addAlert({
          status: "error",
          message: options?.message || error.message || "Server Error",
          action: retryAction,
        });
        return "Server Error";
      default:
        addAlert({
          status: "error",
          message: options?.message || error.message || "Unknown Error",
          action: retryAction,
        });
        return "Unknown Error";
    }
  };

  return { onHandleError };
};

export default useApiError;
