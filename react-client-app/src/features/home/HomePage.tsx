import { Box, Typography, Button } from "@mui/material";
import { Container } from "@mui/system"
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box className="masthead">
      <Container maxWidth="md">
        <Typography variant="h1" className="header" component="h1" gutterBottom>
          <img className="image" src="/assets/logo.png" alt="logo" />
          Reactivities
        </Typography>
        <Typography variant="h2" gutterBottom>
          Welcome to Reactivities
        </Typography>
        <Button 
          component={Link} 
          to="/activities" 
          variant="outlined" 
          size="large" 
        >
          Take me to the activities!
        </Button>
      </Container>
    </Box>
  );

}

export default HomePage;