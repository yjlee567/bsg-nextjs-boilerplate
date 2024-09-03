"use client";

import { useState } from "react";
import { Button, Input, Widget } from "@/components/ui";
import { useApiError } from "@/hooks";
import { ErrorService } from "@/services/error";

const ErrorPage = () => {
  const { onHandleError } = useApiError();

  const [message400, setMessage400] = useState("");
  const [message500, setMessage500] = useState("");

  const handleClick400 = async () => {
    try {
      await ErrorService.badRequest();
    } catch (e: any) {
      onHandleError(e, { message: message400 });
    }
  };

  const handleClick401 = async () => {
    try {
      await ErrorService.unauthorized();
    } catch (e: any) {
      onHandleError(e);
    }
  };

  const handleClick403 = async () => {
    try {
      await ErrorService.forbidden();
    } catch (e: any) {
      onHandleError(e);
    }
  };

  const handleClick404 = async () => {
    try {
      await ErrorService.notFound();
    } catch (e: any) {
      onHandleError(e);
    }
  };

  const handleClick500 = async () => {
    try {
      await ErrorService.server();
    } catch (e: any) {
      onHandleError(e, {
        message: message500,
        onRetry: () => {
          callAfter2s(handleClick500);
        },
      });
    }
  };

  const callAfter2s = (callback: () => void) => {
    setTimeout(() => {
      callback();
    }, 2000);
  };

  return (
    <div className="grid gap-2 grid-cols-3">
      <Widget title="400">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="커스텀 메시지 입력"
            value={message400}
            onChange={(e: any) => setMessage400(e.target.value)}
          />
          <Button onClick={handleClick400}>400 에러 발생</Button>
        </div>
      </Widget>
      <Widget title="401">
        <div className="flex gap-2 items-center">
          <span className="text-sm">버튼 클릭시 로그인 페이지로 이동-{">"}</span>
          <Button onClick={handleClick401}>401 에러 발생</Button>
        </div>
      </Widget>
      <Widget title="403">
        <div className="flex gap-2 items-center">
          <span className="text-sm">버튼 클릭시 403 페이지로 이동-{">"}</span>
          <Button onClick={handleClick403}>403 에러 발생</Button>
        </div>
      </Widget>
      <Widget title="404">
        <div className="flex gap-2 items-center">
          <span className="text-sm">버튼 클릭시 404 페이지로 이동-{">"}</span>
          <Button onClick={handleClick404}>404 에러 발생</Button>
        </div>
      </Widget>
      <Widget title="500">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="커스텀 메시지 입력"
            value={message500}
            onChange={(e: any) => setMessage500(e.target.value)}
          />
          <Button onClick={handleClick500}>500 에러 발생</Button>
        </div>
      </Widget>
    </div>
  );
};

export default ErrorPage;
