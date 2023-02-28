import { observer } from 'mobx-react-lite';
import { Typography, Box, Paper, Avatar, Grid, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ActivityDetailedChat = () => {
    return (
        <>
          <Paper square elevation={0}>
            <Box textAlign="center" bgcolor="primary.main" color="primary.contrastText" p={2}>
              <Typography variant="h6">Chat about this event</Typography>
            </Box>
          </Paper>
          
          <Paper square elevation={0}>
            <Grid container>
              <Grid item xs={12}>
                <Box p={2}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src="/assets/user.png" alt="User Image" />
                    <Box ml={2}>
                      <Typography variant="subtitle1">Matt</Typography>
                      <Typography variant="body2" color="textSecondary">Today at 5:42PM</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" gutterBottom>How artistic!</Typography>
                  <Button variant="contained" color="primary" size="small">Reply</Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box p={2}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src="/assets/user.png" alt="User Image" />
                    <Box ml={2}>
                      <Typography variant="subtitle1">Joe Henderson</Typography>
                      <Typography variant="body2" color="textSecondary">5 days ago</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" gutterBottom>Dude, this is awesome. Thanks so much</Typography>
                  <Button variant="contained" color="primary" size="small">Reply</Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box p={2}>
                  <form>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="reply"
                      label="Add Reply"
                      multiline
                      rows={3}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                    >
                      Add Reply
                    </Button>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
    );
};

export default observer(ActivityDetailedChat);