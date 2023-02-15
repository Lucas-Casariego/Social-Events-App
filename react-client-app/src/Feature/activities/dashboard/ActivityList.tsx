import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


const ActivityList = () => {

  const { activityStore } = useStore();
  const {deleteActivity, activitiesByDate, loading} = activityStore;

  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string 
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };


  return (
    <Box sx={{ width: "100%", maxWidth: 4000, bgcolor: "background.paper" }}>
      {activitiesByDate.map((activity) => {
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
              <Link to={`/activities/${activity.id}`}  >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 1, float: "right" }}
                >
                  View
                </Button>
              </Link>
              <Button
                name={activity.id}
                // instead of simply using the deleteActivity function, we use the HandleActivityDelete function
                onClick={(e) => handleActivityDelete(e, activity.id)}
                disabled={loading && target === activity.id}
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

export default observer(ActivityList);
