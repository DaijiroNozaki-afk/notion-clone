import { Drawer, List, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import memoApi from '../api/memoApi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTrash } from '../redux/features/trashSlice';
import assets from '../assets/index';
const Trash = () => {
  const dispatch = useDispatch();
  const trashMemos = useSelector((state) => state.trashMemo.value);
  // getTrashAll API を使って、ゴミ箱の中身を表示
  // ユーザーからのアクセスがあれば、30日を過ぎたメモを削除する

  useEffect(() => {
    const getTrash = async () => {
      try {
        const res = await memoApi.getTrashAll();
        dispatch(setTrash(res));
      } catch (err) {
        alert('useEffect getTrash' + err);
      }
    };
    getTrash();
    // お気に入りを表示する
  }, [dispatch]);

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    useSelect: 'none',
    margin: `0 0 ${grid} 0`,
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle,
  });
  return (
    <List
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: assets.colors.secondary,
      }}
    >
      Trash
      {trashMemos.map((item, index) => (
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          // to={`/memo/${item._id}`}
          to=""
          key={item._id}
        >
          <Typography>
            {item.icon} {item.title}
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );
};

export default Trash;
