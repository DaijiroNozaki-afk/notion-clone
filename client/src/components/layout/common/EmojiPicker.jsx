import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);
  return (
    <Box>
      <Typography variant="h3" fontWeight="700" sx={{ cursor: 'pointer' }}>
        {props.icon}
      </Typography>
      <Box sx={{ display: 'none' }}>
        <Picker />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
