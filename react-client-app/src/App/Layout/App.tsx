import { useState, useEffect } from "react";
import axios from "axios";
import { IActivity } from "../Models/activity";
import Navbar from "./NavBar";
// import me the styles from the styles.css file (same directory)
import "./styles.css";
import { Container } from "@mui/system";
import ActivityDashboard from "../../Feature/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid'


function App() {
  // with the generic type we are telling useState what type of data we are gonna store in the activities array
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []); // [] means run once (not strictly true)

  const HandleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? HandleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: IActivity) => {
    // we'll remove the existing activity and replace it with the activity passed as parameter
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity)
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  return (
    <div className="App"> 
      <Navbar openForm={handleFormOpen} />
      <Container maxWidth="xl">
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectAcvivity={HandleSelectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </div>
  );
}

export default App;
