import { Button, CircularProgress, TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid} from "uuid";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { IActivity } from "../../../App/models/activity";
import { useStore } from "../../../App/stores/store";


const ActivityForm = () => {

  const {activityStore} = useStore()

  const {
    selectedActivity,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  // so we can get the id from the root parameters
  const {id} = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    // the ! is a non-null assertion operator, it tells typescript that the activity is not null
    // above we are setting the activity to an object with empty strings, so it's not null
    if(id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity]);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
    event.preventDefault();  // this prevents the page from reloading when we submit the form
  }; 

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // we're destructuring the event.target object to get the name and value of the input field of the form
    const { name, value } = event.target;
    // the property with the key of "name" will be set to the value of the input field
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial) return <LoadingComponent />;
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
        disabled={loading}
        type="submit"
        variant="contained"
        sx={{ mt: 2, mr: 1, float: "right" }}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, mr: 1, float: "right" }}
        // esta es otra forma, no necesitamos wrap el botón, simplemente le indicamos que se comportará como un Navlink
        component={Link}
        // y que va a /activities
        to={"/activities"}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default observer(ActivityForm);
