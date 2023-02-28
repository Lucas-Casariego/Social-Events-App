import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";
import { Typography } from "@mui/material";


const ActivityList = () => {

  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;


  return (
    <>
      {/* we are mapping an array of arrays, we destructure to get group and activities
      //   the group represents the date and the activities are the activities for that date */}
      {groupedActivities.map(([group, activities]) => (
        // we use <fragment> instead of <> because we need to add a key to the fragment 
        <Fragment key={group}>
          <Typography variant="subtitle1" margin="1em 1em" color="teal">
            {group}
          </Typography>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
  
};

export default observer(ActivityList);
