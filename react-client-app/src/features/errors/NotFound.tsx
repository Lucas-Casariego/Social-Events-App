import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const NotFound = () => {
  return (
    <Box bgcolor="background.paper" p={4} mt={5} component="div">
      <Typography variant="h5" component="h2" align="center">
        <SearchIcon fontSize="large" color="secondary" style={{marginRight: "0.6em", marginBottom: "-10px"}} />
        Oops - we've looked everywhere but couldn't find what you are looking for!
      </Typography>
      <Box mt={4} display="flex" justifyContent="center">
        <Button component={Link} to="/activities" variant="contained" color="primary">
          Return to Activities page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;