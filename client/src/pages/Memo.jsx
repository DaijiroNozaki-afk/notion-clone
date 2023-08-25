import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Memo = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <TextField
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            '.MuiOutlinedInput-input': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
          }}
        />
        <TextField
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            '.MuiOutlinedInput-input': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1rem' },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
