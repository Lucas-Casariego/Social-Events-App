import { Label } from "@mui/icons-material";
import { Box, Card, FormControl, FormLabel, InputLabel, TextField } from "@mui/material";
import { useField } from "formik";
import DatePicker, {ReactDatePickerProps} from "react-datepicker";
import React from "react";

// with the partial, we make every prop optional
// this bc we don't want to have to pass the onChange prop, we define it in the component
const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
  // the hook will tie this up with the matching field in the form
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Box m={1}>
      <DatePicker
        {...field}
        {...props}
        // we're overriding the props here
        // if the field has a value, use it for selected otherwise use null
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => helpers.setValue(value)}
        />
      {meta.touched && meta.error ? (
        <FormLabel error>{meta.error}</FormLabel>
        ) : null}
    </Box>
  );
};

export default MyDateInput;