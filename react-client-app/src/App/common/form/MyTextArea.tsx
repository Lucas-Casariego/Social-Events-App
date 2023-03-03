import { Box, FormLabel } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface IMyTextAreaProps {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

const myTextArea = (props: IMyTextAreaProps) => {
  const [field, meta] = useField(props.name);
  return (
    <Box p={1}>
      <label>{props.label}</label>
      <textarea
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

export default myTextArea;