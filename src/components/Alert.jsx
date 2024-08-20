import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export const WarningAlert = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Warning</AlertTitle>
      This is a warning Alert with a cautious title.
    </Alert>
  );
};
