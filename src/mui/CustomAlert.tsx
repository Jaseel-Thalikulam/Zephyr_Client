import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IMuiAlert } from '../interfaces/IMuiAlert';


function CustomAlert({ snackbarOpen, handleCloseSnackbar, snackbarMessage, severity }: IMuiAlert) {
  return (
    <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
      autoHideDuration={4000}
      open={snackbarOpen}
      onClose={handleCloseSnackbar}

    >
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={severity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
}

export default CustomAlert;