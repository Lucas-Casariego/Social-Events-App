import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useStore } from "../../../App/stores/store";


const ActivityDetails = () => {

  const {activityStore} = useStore();
  // alias for activity (so no refactor needed)
  const {selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  // Get the id from the url path
  const {id} = useParams<{id: string}>();


  useEffect(() => {
  if (id) 
    loadActivity(id);
}, [id, loadActivity]);
  

  if(loadingInitial || !activity) return <></>; // just to remove undefined error (you must return jsx, we checked that in ActivityDashboard )

  return (
    <Card sx={{ width: "400px", ml: 3, mt: 5 }}>
      <CardMedia
        sx={{ height: 0, paddingTop: "56.25%" }}
        image={`/public/assets/categoryImages/${activity.category}.jpg`}
      />
      <Typography variant="h5" mt={2} ml={2}>
        {activity.title}
      </Typography>
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {activity.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup
          size="medium"
          fullWidth
          aria-label="small outlined button group"
        >
          <NavLink
            to={`/manage/${activity.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" color="primary">
              Edit
            </Button>
          </NavLink>
          <NavLink to={"/activities"} style={{ textDecoration: "none" }}>
            <Button
              // we don't use the () => syntax bc we are not passing an argument to the function inside the onClick (not strictly true)
              variant="outlined"
              color="warning"
            >
              Cancel
            </Button>
          </NavLink>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default observer(ActivityDetails);
