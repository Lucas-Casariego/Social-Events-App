import React, { CSSProperties } from 'react';
import { Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const hostLabel : CSSProperties = {
  position: 'absolute',
  right: 0,
  top: 0,
  backgroundColor: '#3f51b5',
  color: 'white',
  padding: '0.5rem',
};

const ActivityDetailedSidebar = () => {
  return (
    <>
    
      <Paper style={{ marginBottom: '2rem' }}>
        <Typography variant="h6" bgcolor="primary.main" style={{textAlign: 'center', color: 'white', padding: '0.6rem' }}>3 People Going</Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Host" src="/assets/user.png" sx={{ width: 50, height: 50 }}/>
            </ListItemAvatar>
            <ListItemText 
              style={{marginLeft: '0.7em'}}
              primary={
                <>
                  <Link to="#" style={{textDecoration: "none", color: "blue"}}>Bob</Link>
                  <Typography
                    variant="subtitle2"
                    style={{ color: 'orange' }}
                  >
                    Following
                  </Typography>
                </>
              }
            />
            <Typography variant="subtitle2" style={hostLabel}>Host</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Tom" src="/assets/user.png" sx={{ width: 50, height: 50 }}/>
            </ListItemAvatar>
            <ListItemText 
              style={{marginLeft: '0.7em'}}
              primary={
                <>
                  <Link to="#" style={{textDecoration: "none", color: "blue"}}>Tom</Link>
                  <Typography
                    variant="subtitle2"
                    style={{ color: 'orange' }}
                  >
                    Following
                  </Typography>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Sally" src="/assets/user.png" sx={{ width: 50, height: 50 }}/>
            </ListItemAvatar>
            <ListItemText 
              style={{marginLeft: '0.7em'}} 
              primary={<Link to="#" style={{textDecoration: "none", color: "blue"}}>Sally</Link>} />
          </ListItem>
        </List>
      </Paper>
    </>
  );
};


export default observer(ActivityDetailedSidebar);
