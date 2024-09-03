import React from "react";
import Section from "@/components/shared/Section";
import { Button, Tooltip, ConfirmModal } from "@/components/ui";
import { useAlert, useModal, useToast } from "@/hooks/";

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

const ActionButtonSection = () => {
  const { addToast } = useToast();
  const { addAlert } = useAlert();
  const { addModal, dismissModal } = useModal();

  return (
    <Section title="Action Button">
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => {
            const time = Date.now().toString();
            addToast({
              id: time,
              message: "Hello->" + time,
            });
          }}
        >
          Show Toast
        </Button>
        <Button
          onClick={() => {
            addAlert({
              message: "Info Alert",
              status: "info",
            });
          }}
        >
          Info Alert
        </Button>
        <Button
          onClick={() => {
            addAlert({
              message: "Success Alert",
              status: "success",
            });
          }}
        >
          Success Alert
        </Button>
        <Button
          onClick={() => {
            addAlert({
              message: "Warning Alert",
              status: "warning",
            });
          }}
        >
          Warning Alert
        </Button>
        <Button
          onClick={() => {
            addAlert({
              message: "Error Alert",
              status: "error",
            });
          }}
        >
          Error Alert
        </Button>
        <Button
          onClick={() => {
            const time = Date.now().toString();
            addModal({
              id: time,
              element: (
                <ConfirmModal
                  content="hello?"
                  success={{
                    onClick: () => {
                      wait().then(() => {
                        dismissModal(time);
                      });
                    },
                  }}
                />
              ),
            });
          }}
        >
          Open Modal
        </Button>
        <Tooltip content="show Tooltip!">
          <Button>Tooltip</Button>
        </Tooltip>
      </div>
    </Section>
  );
};

export default ActionButtonSection;
