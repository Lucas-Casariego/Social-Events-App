import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
    
  }, [activityStore, activityRegistry.size]); 

  if (activityStore.loadingInitial) return <LoadingComponent />;

  return (
    <Grid container>
      <Grid item xs={8} mt={5}>
        <ActivityList />
      </Grid>
      <Grid>
        <h2>Activity filters</h2>
      </Grid>
    </Grid>
  );
};

export default observer(ActivityDashboard)