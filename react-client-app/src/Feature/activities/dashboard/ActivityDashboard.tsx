import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../App/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {

  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid container>
      <Grid item xs={8} mt={5}>
        <ActivityList />
      </Grid>
      <Grid>
        {/* if there is a selectedActivity and we're not in editMode then show the ActivityDetails component */}
        {/* this is a conditional rendering */}
        {/* this bc though we're passing the selectedActivity as a prop to the ActivityDashboard component, 
        the array is empty at the beginning, so we need to check if there is an activity in the array before we show the ActivityDetails component */}
        {/* if you get an error like this: cannot read property 'someProperty' of undefined it's probably this */}
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid>
    </Grid>
  );
};

export default observer(ActivityDashboard)