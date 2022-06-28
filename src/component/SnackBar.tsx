import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


interface AppProps {
    message: string
    open: boolean
    setOpen:Function
  }
export default function PositionedSnackbar({ message, open ,setOpen}: AppProps) {

    const [isOpen,setIsOpen]=React.useState<boolean>(open);

    React.useEffect(()=>{
        setIsOpen(open);
    },[open])
   
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
          }
          setIsOpen(false);
          setOpen(false);
      };
  return (
    <div>
     
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={1000}
        message={message}
      //  key={vertical + horizontal}
      />
    </div>
  );
}
