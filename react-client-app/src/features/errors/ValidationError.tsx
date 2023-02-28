import { Message } from "@mui/icons-material";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

interface IProps {
  errors: string[];
}

const ValidationError = ({errors}: IProps) => {
  return(
    errors && (
      <Box mt={2} p={1} style={{backgroundColor: '#eee0e0', border: '1px solid #eea0a0', opacity: '0.8'}}>
        <List dense component="div" >
          {errors.map((err: string, index) => (
            <ListItem key={index}>
              <ListItemText primary={err} style={{color: 'red'}}/>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  )
}


export default ValidationError;

