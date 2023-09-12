import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../redux/features/memoSlice';
import { setFavorite } from '../redux/features/favoriteSlice';
import EmojiPicker from '../components/layout/common/EmojiPicker';

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favoriteMemo.value);
  const [isStar, setIsStar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
        setIsStar(res.favorite);
      } catch (err) {
        alert('getMemo ' + err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
        // タイトル変更を行ったら、Sidebar のタイトルも更新する、dispatch する
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
        const resFavorite = await memoApi.getFavoriteAll();
        dispatch(setFavorite(resFavorite));
      } catch (err) {
        alert('updateTimer ' + err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert('updateDescription ' + err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      // console.log(deletedMemo);

      const newMemos = memos.filter((e) => e._id !== memoId);
      if (newMemos.length === 0) {
        navigate('/memo');
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemo(newMemos));
      //お気に入りの処理
      const newFavoriteMemos = favoriteMemos.filter((e) => e._id !== memoId);
      dispatch(setFavorite(newFavoriteMemos));
    } catch (err) {
      alert('deleteMemo' + err);
    }
  };

  const onIconChange = async (newIcon) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    // Sidebar のfavorite も更新する
    let favoTemp = [...favoriteMemos];
    const favoIndex = favoTemp.findIndex((e) => e._id === memoId);
    favoTemp[favoIndex] = { ...favoTemp[favoIndex], icon: newIcon };
    dispatch(setFavorite(favoTemp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const changeStar = async () => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    const favorite = temp[index].favorite;
    temp[index] = { ...temp[index], favorite: !favorite };
    setIsStar(!favorite);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, { favorite: !favorite });
      // favorite ボタンを押したら、dispatch する
      const resFavorite = await memoApi.getFavoriteAll();
      dispatch(setFavorite(resFavorite));
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton onClick={changeStar}>
          {isStar ? (
            <StarIcon sx={{ color: '#FDDD28' }} />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            label={'題名'}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '.MuiOutlinedInput-root': {
                fontSize: '2rem',
                fontWeight: '700',
              },
              'MuiFormLabel-root': {
                marginTop: '100px',
              },
            }}
          />
          <TextField
            onChange={updateDescription}
            label={'本文'}
            value={description}
            placeholder="追加"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '1rem' },
            }}
          />
        </Box>
      </Box>
      <h3>ストーリーの核</h3>
      <Box>
        <h4>発見</h4>
        <TextField />
        <h4>継承</h4>
        <TextField />
        <h4>法則</h4>
        <TextField />
      </Box>
      <h3>ストーリー</h3>
      <Box>
        <h4>始まり：連想からの逸脱</h4>
        <TextField />
        <h4>順序：反論する</h4>
        <TextField />
        <h4>終わり：結論付ける</h4>
        <TextField />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">解決方法</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={'解決'}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={'感情的な解決'}>感情的な解決</MenuItem>
            <MenuItem value={'乗り越えと共感原則の解決'}>
              乗り越えと共感原則の解決
            </MenuItem>
            <MenuItem value={'論理的な解決'}>論理的な解決</MenuItem>
            <MenuItem value={'律法(習慣)的な解決'}>律法(習慣)的な解決</MenuItem>
            <MenuItem value={'諧謔的(ユーモア)な解決'}>
              諧謔的(ユーモア)な解決
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Memo;
