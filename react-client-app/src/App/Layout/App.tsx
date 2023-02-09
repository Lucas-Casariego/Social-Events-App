import { useState, useEffect } from "react";
import Navbar from "./NavBar";
// import me the styles from the styles.css file (same directory)
import "./styles.css";
import { Container } from "@mui/system";
import ActivityDashboard from "../../Feature/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); 

  if (activityStore.loadingInitial) return <LoadingComponent />;
  
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="xl">
        <ActivityDashboard
        />
      </Container>
    </div>
  );
}

export default observer(App);
