import {
  Grid,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../App/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";


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
    <Grid container>
      <Grid item xs={7}>
        <ActivityDetailedHeader activity={activity}/> 
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid>
      <Grid item xs={4}>
        <ActivityDetailedSidebar />
      </Grid>
    </Grid>
  );
};

export default observer(ActivityDetails);