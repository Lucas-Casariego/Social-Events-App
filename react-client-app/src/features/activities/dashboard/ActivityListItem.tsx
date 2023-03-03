import { LocationOn } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, createStyles, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Theme, Typography } from "@mui/material";
import { format } from "date-fns";
import { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../App/models/activity";
import { useStore } from "../../../App/stores/store";

interface IProps {
  activity: IActivity;
}


const ActivityListItem = ({activity}: IProps) => {
  const { activityStore } = useStore();
  const {deleteActivity, loading} = activityStore;

  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string 
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };


  return (
    <Card sx={{margin: "10px"}}>
      <CardHeader
        avatar={<Avatar alt="user" src="/assets/user.png" style={{width: "80px", height: "80px"}} />}
        title={
          <Typography
            component={Link}
            to={`/activities/${activity.id}`}
            style={{ textDecoration: "none", color: "#212427" }}
            variant="h5"
          >
            {activity.title}
          </Typography>
        }
        subheader="Hosted by Bob"
      />
      <Divider />
      <Divider />
      <CardContent sx={{display: 'flex'}}>
        <Typography variant="body2" color="textSecondary" style={{fontSize: '1.1em'}}>
          {format(activity.date!, 'dd MMM yyyy h:mm aa')}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{marginLeft: '1em', fontSize: '1.1em'}}>
          <LocationOn fontSize="small" />
          {activity.venue}
        </Typography>
      </CardContent>
      <Paper square style={{padding: "1em", backgroundColor: "#f2f2f2"}}>
        Attendees go here
      </Paper>
      <CardContent>
        <Typography variant="body1" color="textSecondary" >
          {activity.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* view */}
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          variant="contained"
          size="small"
          style={{ marginLeft: "92%", marginTop: "-65px"}}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityListItem;
