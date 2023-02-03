import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { IActivity } from "../../../App/Models/activity";
import Box from "@mui/material/Box";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const ActivityList = ({ activities, selectActivity, deleteActivity }: IProps) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 4000, bgcolor: "background.paper" }}>
      {activities.map((activity) => {
        return (
          <Card key={activity.id}>
            <CardContent>
              <CardHeader title={activity.title} />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {activity.date}
              </Typography>
              <Typography variant="body2">{activity.description}</Typography>
              <Typography variant="subtitle1">
                {activity.city}, {activity.venue}
              </Typography>
              <Button
                variant="outlined"
                color="info"
                size="small"
                sx={{ mt: 1 }}
                >
                {activity.category}
              </Button>
              <Button
                // we use the () => syntax bc we are passing an argument to the function inside the onClick (not strictly true)
                onClick={() => selectActivity(activity.id)}
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 1, float: "right" }}
              >
                View
              </Button>
              <Button 
                // we use the () => syntax bc we are passing an argument to the function inside the onClick (not strictly true)
                onClick={() => deleteActivity(activity.id)}
                variant="contained"
                color="error"
                size="small"
                sx={{ mt: 1, mx: 2, float: "right" }}
              >
                Delete
              </Button>
            </CardContent>
            <Divider variant={"middle"} />
          </Card>
        );
      })}
    </Box>
  );
};

export default ActivityList;
