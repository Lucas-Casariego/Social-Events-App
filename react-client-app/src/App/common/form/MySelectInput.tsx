import { Label } from "@mui/icons-material";
import { Box, Card, FormControl, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface IMySelectInputProps {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}


const MySelectInput = (props: IMySelectInputProps) => {
  // the helper allows us to manually set the value and manually set the touched status of our input component
  const [field, meta, helpers] = useField(props.name);

  const handleChange = (event: SelectChangeEvent) => {
    helpers.setValue(event.target.value as string);
  };

  return (
    <FormControl sx={{ m: 1, width: "101%"}}>
      <InputLabel id="select-category-label">{props.label}</InputLabel>
      <Select
        labelId="select-category-label"
        id="select-category"
        value={field.value || ''}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
        label={props.label}
      >
        {props.options.map((opt: any, index: number) => (
          <MenuItem key={index} value={opt.value}>{opt.text}</MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <div>
          <FormLabel error>{meta.error}</FormLabel>
        </div>
      ) : null}
    </FormControl>
)};




export default MySelectInput;