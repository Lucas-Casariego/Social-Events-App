import { useState } from 'react';
import Calendar from 'react-calendar';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


export default function ActivityFilters() {
  const [value, onChange] = useState(new Date());

  const filterItemStyle: React.CSSProperties = {
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
  }


  return (
    <>
      <List style={{width: "100%", marginTop: "3.2em" }}>
        <ListItem style={filterItemStyle}>
          <ListItemIcon>
            <FilterAltIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary="Filter"/>
        </ListItem>
        <ListItem style={filterItemStyle}>
          <ListItemText primary="All Activities"/>
        </ListItem>
        <ListItem style={filterItemStyle}>
          <ListItemText primary="I'm going" />
        </ListItem>
        <ListItem style={filterItemStyle}>
          <ListItemText primary="I'm hosting" />
        </ListItem>
      </List>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}
