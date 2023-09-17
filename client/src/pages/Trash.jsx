import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import memoApi from '../api/memoApi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTrash } from '../redux/features/trashSlice';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { setMemo } from '../redux/features/memoSlice';
import { setFavorite } from '../redux/features/favoriteSlice';
import CloseIcon from '@mui/icons-material/Close';

const Trash = () => {
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(false);
  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favoriteMemo.value);
  const [openSnack, setOpenSnack] = useState({
    isOpen: false,
    message: '',
  });

  const handleClick = (props) => {
    setOpenSnack({ ...openSnack, isOpen: true, message: props });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack({ ...openSnack, isOpen: false, message: '' });
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  //降順のfavoritePositionソート
  const descFavoritePositionSort = (props) => {
    const sorted = props.sort((a, b) => {
      if (a.favoritePosition < b.favoritePosition) {
        return 1;
      }
      if (a.favoritePosition > b.favoritePosition) {
        return -1;
      }
      return 0;
    });
    return sorted;
  };
  //降順のpositionソート
  const descPositionSort = (props) => {
    const sorted = props.sort((a, b) => {
      if (a.position < b.position) {
        return 1;
      }
      if (a.position > b.position) {
        return -1;
      }
      return 0;
    });
    return sorted;
  };
  const trashMemos = useSelector((state) => state.trashMemo.value);
  // getTrashAll API を使って、ゴミ箱の中身を表示
  // ユーザーからのアクセスがあれば、30日を過ぎたメモを削除する

  useEffect(() => {
    const getTrash = async () => {
      try {
        const res = await memoApi.getTrashAll();
        setIsEmpty(res.length === 0);
        dispatch(setTrash(res));
      } catch (err) {
        alert('useEffect getTrash' + err);
      }
    };
    getTrash();
    // お気に入りを表示する
  }, [dispatch]);

  const undo = async (item) => {
    const memoTitle = item.title;
    let temp = [...memos];
    //memos に削除したメモを戻す
    temp = [item, ...temp];
    temp = descPositionSort(temp);
    dispatch(setMemo(temp));
    //お気に入り の場合、削除したメモをお気に入りに戻す
    if (item.favorite) {
      let favoriteTemp = [...favoriteMemos];
      favoriteTemp = [item, ...favoriteTemp];
      favoriteTemp = descFavoritePositionSort(favoriteTemp);
      dispatch(setFavorite(favoriteTemp));
    }
    //trashMemos から該当するメモを削除
    const memoId = item._id;
    const trashTemp = trashMemos.filter((e) => e._id !== memoId);
    dispatch(setTrash(trashTemp));
    setIsEmpty(trashTemp.length === 0);
    //データベースのisTrash をfalse にしてtrashDate を削除する
    try {
      await memoApi.update(memoId, { isTrash: false });
      handleClick(memoTitle + ' を元に戻しました');
      //お気に入りの処理
    } catch (err) {
      alert('undo ' + err);
    }
  };
  const deleteForever = async (item) => {
    const isDelete = window.confirm(item.title + ' を完全に削除しますか？');
    if (isDelete) {
      const memoTitle = item.title;
      const memoId = item._id;
      //trashMemos から該当するメモを削除
      const trashTemp = trashMemos.filter((e) => e._id !== memoId);
      setIsEmpty(trashTemp.length === 0);
      dispatch(setTrash(trashTemp));
      try {
        await memoApi.delete(memoId);
        handleClick(memoTitle + ' を削除しました');
      } catch (err) {
        alert('deleteForever' + err);
      }
    }
  };
  return (
    <>
      <List
        sx={{
          width: 600,
        }}
      >
        <h3>ゴミ箱</h3>
        {isEmpty ? (
          <Typography variant="body1">ゴミ箱は空です。</Typography>
        ) : (
          <Typography variant="body1">
            ゴミ箱の中のメモは、削除から30日が経過すると、完全に削除されます。
          </Typography>
        )}

        {trashMemos.map((item, index) => (
          <ListItemButton
            sx={{ pl: '20px' }}
            component={Link}
            // to={`/memo/${item._id}`}
            to=""
            key={item._id}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                {item.icon} {item.title}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => undo(item)}
                  sx={{ margin: '0 0 auto' }}
                >
                  {/* <Tooltip title="メモを元に戻す" placement="top-start" arrow> */}
                  <UndoIcon />
                  {/* </Tooltip> */}
                </IconButton>
                <IconButton
                  onClick={() => deleteForever(item)}
                  sx={{ margin: '0' }}
                >
                  <Tooltip title="完全に削除する" placement="top-start" arrow>
                    <DeleteForeverIcon />
                  </Tooltip>
                </IconButton>
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
      <Box>
        <Snackbar
          open={openSnack.isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={openSnack.message}
          action={action}
        />
      </Box>
    </>
  );
};

export default Trash;
