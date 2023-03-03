import { Label } from "@mui/icons-material";
import { Box, Card, FormLabel, InputLabel, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface IMyTextInputProps {
  placeholder: string;
  name: string;
  label?: string;
}
// this is a custom input component that will be used in the form
const MyTextInput = (props: IMyTextInputProps) => {
  // the hook will tie this up with the matching field in the form
  const [field, meta] = useField(props.name);
  return (
    <Box p={1}>
      <label>{props.label}</label>
      <input
        {...field}
        {...props}
        style={{
          width: "100%",
          fontSize: "16px", // increase font size
          padding: "10px", // increase padding
        }}
        />
      {meta.touched && meta.error ? (
        <FormLabel error>{meta.error}</FormLabel>
        ) : null}
    </Box>
  );
};

export default MyTextInput;