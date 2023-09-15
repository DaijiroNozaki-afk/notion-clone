import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import memoApi from '../api/memoApi';
import { useNavigate } from 'react-router-dom';
const Trash = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      // console.log(res);
      Navigate(`/memo/${res._id}`);
    } catch (err) {
      alert('Trash ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Trash
    </Box>
  );
};

export default Trash;
