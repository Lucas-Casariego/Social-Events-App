import { observer } from 'mobx-react-lite';
import React from 'react'
import { Typography, Grid, Paper, Divider } from '@mui/material';
import { Info, DateRange, Room, GitHub } from '@mui/icons-material';
import { IActivity } from '../../../App/models/activity';
import { CSSProperties } from 'react';

// a object for styling the paper

const paperStyle : CSSProperties = {
  padding: '12px 16px',
}

const ActivitiyIconStyle = {
  marginRight: '0.5em'
}

interface Props {
  activity: IActivity
}

const ActivityDetailedInfo = ({ activity }: Props) => {
  // the trigger inline suggestion in vscode for GitHub copilot shortcut is: 
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop="10px">
        <Paper style={paperStyle}>
          <Typography variant="body1">
            <Info color="primary" style={ActivitiyIconStyle}/>
            {activity.description}
          </Typography>
        </Paper>
        <Divider light />
        <Paper style={paperStyle}>
          <Typography variant="body1" >
            <DateRange color="primary" style={ActivitiyIconStyle}/>
            {activity.date}
          </Typography>
        </Paper>
        <Divider light />
        <Paper style={paperStyle}>
          <Typography variant="body1">
            <Room color="primary" style={ActivitiyIconStyle}/>
            {activity.venue}, {activity.city}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default observer(ActivityDetailedInfo);