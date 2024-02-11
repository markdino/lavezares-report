import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Alert,
  Typography,
  Spinner,
} from "@/components/client";

import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const DeleteModal = ({
  open,
  onConfirm = () => {},
  onCancel = () => {},
  loading,
  error,
  itemName = "Item",
}) => {
  return (
    <Dialog open={open} size="xs">
      <DialogHeader>{`Delete ${itemName}`}</DialogHeader>
      <DialogBody className="flex flex-col gap-2">
        <section>
          {`Are you sure you want to delete this ${itemName}? This action cannot be
          undone.`}
        </section>
        <section>
          {error && (
            <Alert
              color={error.status !== 404 && "red"}
              variant="ghost"
              className="mt-4"
            >
              <section className="flex gap-2">
                {error.status === 404 ? (
                  <ReportRoundedIcon />
                ) : (
                  <WarningRoundedIcon />
                )}
                <Typography>{error.message}</Typography>
              </section>
            </Alert>
          )}
        </section>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          size="lg"
          color="gray"
          onClick={onCancel}
          className="mr-1 border"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          size="lg"
          color="red"
          onClick={onConfirm}
          disabled={loading}
          className="flex gap-1 items-center"
        >
          {loading && <Spinner color="red" />}
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteModal;
