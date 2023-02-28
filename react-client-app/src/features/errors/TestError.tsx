import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import ValidationError from "./ValidationError";

export default function TestErrors() {
  const baseUrl = "http://localhost:5000/api/";
  const [errors, setErrors] = useState(null);
  function handleNotFound() {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get(baseUrl + "activities/notaguid")
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios
      .post(baseUrl + "activities", {})
      .catch((err) => setErrors(err));
  }

  return (
    <>
      <Typography variant="h2" gutterBottom align="center" mt={3} mb={3}>
        Test Error component
      </Typography>
      <Box
        border="1px solid #1f77fe"
        padding={2}
      >
        <Stack direction="row" spacing={12} justifyContent="center">
          <Button onClick={handleNotFound}>Not Found</Button>
          <Button onClick={handleBadRequest}>Bad Request</Button>
          <Button onClick={handleValidationError}>Validation Error</Button>
          <Button onClick={handleServerError}>Server Error</Button>
          <Button onClick={handleUnauthorised}>Unauthorised</Button>
          <Button onClick={handleBadGuid}>Bad Guid</Button>
        </Stack>
      </Box>
      {errors && <ValidationError errors={errors} /> }
    </>
  );
}
