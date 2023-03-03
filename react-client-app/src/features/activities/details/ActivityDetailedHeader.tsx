import { Paper, Grid, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../App/models/activity";

const activityImageStyle = {
  filter: "brightness(50%)",
  width: "100%",
};

const activityImageTextStyle : CSSProperties  = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const activitybuttonStyle = {
  margin: "1em",
};

interface IProps {
  activity: IActivity;
}

const ActivityDetailedHeader = ({ activity }: IProps) => {
  return (
    <Paper elevation={1} style={{paddingBottom: '1em'}}>
      <Grid container>
        <Grid item xs={12}>
          {/* the typographies will position themselves relative to this div */}
          <div style={{ position: "relative" }}>
            <img
              src={`/assets/categoryImages/${activity.category}.jpg`}
              alt={activity.title}
              style={activityImageStyle}
            />
            <div style={activityImageTextStyle}>
              <Typography variant="h4" component="h1" gutterBottom>
                {activity.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {format(activity.date!, "dd MMM yyyy")}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Hosted by <strong>Bob</strong>
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          direction="row"
          item
          width="100%"
          position="relative"
        >
          <Button color="primary" variant="contained" style={activitybuttonStyle}>
            Join Activity
          </Button>
          <Button color="primary" variant="contained" style={activitybuttonStyle}>
            Cancel attendance
          </Button>
          <Button component={Link} to={`/manage/${activity.id}`} color="secondary" variant="contained" style={{marginLeft: "35%"}}>
            Manage Event
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(ActivityDetailedHeader);
