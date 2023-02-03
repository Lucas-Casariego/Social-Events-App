import { Button, TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import { IActivity } from "../../../App/Models/activity";

interface IProps {
  activity: IActivity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: IActivity) => void;
}
// the "activity: selectedActivity" is not a type declaration, it's an alias for the activity prop
const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit }: IProps) => {
  const initialFormState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialFormState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // we're destructuring the event.target object to get the name and value of the input field of the form
    const { name, value } = event.target;
    // the property with the key of "name" will be set to the value of the input field
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Box
      onSubmit={handleSubmit}
      autoComplete="off"
      mt={5}
      ml={4}
      component="form"
      sx={{
        float: "none",
        maxWidth: "360px",
        backgroundColor: "white",
        pt: 3,
        px: 3,
        pb: 8,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <TextField
        // this is the default value of the input field title (the activity's title)
        // but it's not like defaultValue prop, it is unmutable from the DOM 
        // it is mutable from the state (see the handleInputChange function)
        value={activity.title}
        name="title"
        onChange={handleInputChange}
        fullWidth
        required
        label="Title"
        style={{ marginBottom: 14 }}
      />
      <TextField
        value={activity.city}
        name="city"
        onChange={handleInputChange}
        fullWidth
        required
        label="City"
        style={{ marginBottom: 14 }}
      />
      <TextField
        value={activity.venue}
        name="venue"
        onChange={handleInputChange}
        fullWidth
        required
        label="Venue"
        helperText="the place where it will be held"
        style={{ marginBottom: 14 }}
      />
      <TextField
        value={activity.category}
        name="category"
        onChange={handleInputChange}
        required
        fullWidth
        label="Category"
      />
      <TextareaAutosize
        value={activity.description}
        name="description"
        onChange={handleInputChange}
        placeholder="Description" //  same as defaultValue
        minRows={3}
        style={{ width: 350, marginTop: 14, marginBottom: 14 }}
        // adjust the width of the textarea so it fits the form
      />
      <TextField
        value={activity.date}
        name="date"
        onChange={handleInputChange}
        fullWidth
        label="date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mr: 1, float: "right" }}
      >
        Submit
      </Button>
      <Button
        onClick={closeForm}
        variant="contained"
        sx={{ mt: 2, mr: 1, float: "right" }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default ActivityForm;
