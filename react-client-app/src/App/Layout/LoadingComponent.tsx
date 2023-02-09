import React from "react";
import { Modal, Backdrop, CircularProgress, Box } from "@mui/material";

interface IProps {
  // the inverted prop means that the loading component will be displayed in the opposite color
  inverted?: boolean;
}

const LoadingComponent = ({ inverted = false }: IProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
>
  <CircularProgress />
</Box>


    

  );
};

export default LoadingComponent;
