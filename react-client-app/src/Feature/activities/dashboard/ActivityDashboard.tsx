import { Grid } from "@mui/material";
import { IActivity } from "../../../App/Models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// we are passing the activities array as a prop to the ActivityDashboard component
interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | undefined;
  selectAcvivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectAcvivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity
}: IProps) {
  return (
    <Grid container>
      <Grid item xs={8} mt={5}>
        <ActivityList activities={activities} selectActivity={selectAcvivity} deleteActivity={deleteActivity} />
      </Grid>
      <Grid>
        {/* if there is a selectedActivity and we're not in editMode then show the ActivityDetails component */}
        {/* this is a conditional rendering */}
        {/* this bc though we're passing the selectedActivity as a prop to the ActivityDashboard component, 
        the array is empty at the beginning, so we need to check if there is an activity in the array before we show the ActivityDetails component */}
        {/* if you get an error like this: cannot read property 'someProperty' of undefined it's probably this */}
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>
        )}
      </Grid>
    </Grid>
  );
}
