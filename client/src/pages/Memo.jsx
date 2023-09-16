import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
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
import CloseIcon from '@mui/icons-material/Close';

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    discovery: '',
    inheritance: '',
    storyRule: '',
    startStory: '',
    orderStory: '',
    endStory: '',
    solution: '',
  });

  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favoriteMemo.value);
  const [isStar, setIsStar] = useState(false);
  const navigate = useNavigate();
  // const [openSnack, setOpenSnack] = useState(false);
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

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setFormData({
          ...formData,
          description: res.description,
          discovery: res.discovery,
          inheritance: res.inheritance,
          storyRule: res.storyRule,
          startStory: res.startStory,
          orderStory: res.orderStory,
          endStory: res.endStory,
          solution: res.solution,
        });
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
  const updateField = async (e, fieldName) => {
    clearTimeout(timer);
    const newValue = e.target.value;
    setFormData({ ...formData, [fieldName]: newValue });

    timer = setTimeout(async () => {
      try {
        const updateData = {};
        updateData[fieldName] = newValue;
        await memoApi.update(memoId, updateData);
      } catch (err) {
        alert(`update${fieldName} ${err}`);
      }
    }, timeout);
  };

  const updateDescription = (e) => {
    updateField(e, 'description');
  };

  const updateDiscovery = (e) => {
    updateField(e, 'discovery');
  };
  const updateInheritance = (e) => {
    updateField(e, 'inheritance');
  };
  const updateStoryRule = (e) => {
    updateField(e, 'storyRule');
  };
  const updateStartStory = (e) => {
    updateField(e, 'startStory');
  };
  const updateOrderStory = (e) => {
    updateField(e, 'orderStory');
  };
  const updateEndStory = (e) => {
    updateField(e, 'endStory');
  };
  const updateSolution = (e) => {
    updateField(e, 'solution');
  };

  const deleteMemo = async () => {
    // 直接削除ではなく、「ゴミ箱に入れる」事でユーザーの削除ミスを取り返せるようにする
    const memoTitle = title;
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    const isTrash = temp[index].isTrash;
    temp[index] = { ...temp[index], isTrash: !isTrash };
    const newMemos = memos.filter((e) => e._id !== memoId);
    if (newMemos.length === 0) {
      navigate('/memo');
    } else {
      navigate(`/memo/${newMemos[0]._id}`);
    }
    dispatch(setMemo(newMemos));
    const newFavoriteMemos = favoriteMemos.filter((e) => e._id !== memoId);
    dispatch(setFavorite(newFavoriteMemos));

    try {
      await memoApi.update(memoId, { isTrash: !isTrash });
      handleClick(memoTitle + ' を削除しました');
      //お気に入りの処理
    } catch (err) {
      alert('deleteMemo ' + err);
    }
    // const memoTitle = title;
    // try {
    //   await memoApi.delete(memoId);
    //   const newMemos = memos.filter((e) => e._id !== memoId);
    //   handleClick(memoTitle + ' を削除しました');
    //   if (newMemos.length === 0) {
    //     navigate('/memo');
    //   } else {
    //     navigate(`/memo/${newMemos[0]._id}`);
    //   }
    //   dispatch(setMemo(newMemos));
    //   //お気に入りの処理
    //   const newFavoriteMemos = favoriteMemos.filter((e) => e._id !== memoId);
    //   dispatch(setFavorite(newFavoriteMemos));
    // } catch (err) {
    //   alert('deleteMemo ' + err);
    // }
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
      alert('onIconChange ' + err);
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
      alert('changeStar ' + err);
    }
  };

  const getTextFieldStyle = () => ({
    '.MuiOutlinedInput-input': { padding: 0 },
    '.MuiOutlinedInput-root': {
      width: '100%',
      fontSize: '0.7rem',
    },
    width: '100%',
  });
  const getCoreTextFieldStyle = () => ({
    width: '30%',
  });
  return (
    <>
      <Box>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80px',
          }}
        >
          <EmojiPicker icon={icon} onChange={onIconChange} />
        </Box>
        <Box
          sx={{
            width: 'calc(100% - 80px)',
          }}
        >
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
            }}
          />
        </Box>
      </Box>
      <Tooltip title="この回だけのあらすじを書く。" placement="top-start" arrow>
        <h3>あらすじ</h3>
      </Tooltip>
      <Box>
        <TextField
          onChange={updateDescription}
          value={formData.description}
          placeholder="追加"
          variant="outlined"
          multiline
          fullWidth
          sx={{
            '.MuiOutlinedInput-input': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1rem' },
          }}
        />
      </Box>
      <h3>ストーリーの核</h3>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Box sx={getCoreTextFieldStyle}>
          <Tooltip title="発見" placement="top" arrow>
            <h4 style={{ width: '100%' }}>発見</h4>
          </Tooltip>
          <TextField
            value={formData.discovery}
            onChange={updateDiscovery}
            multiline
            sx={getTextFieldStyle()}
          />
        </Box>
        <Box sx={getCoreTextFieldStyle}>
          <Tooltip title="発見" placement="top" arrow>
            <h4>継承</h4>
          </Tooltip>
          <TextField
            value={formData.inheritance}
            onChange={updateInheritance}
            multiline
            sx={getTextFieldStyle()}
          />
        </Box>
        <Box sx={getCoreTextFieldStyle}>
          <Tooltip title="発見" placement="top" arrow>
            <h4>法則</h4>
          </Tooltip>
          <TextField
            value={formData.storyRule}
            onChange={updateStoryRule}
            multiline
            sx={getTextFieldStyle()}
          />
        </Box>
      </Box>
      <h3>ストーリー</h3>

      <Box>
        <Box>
          <Tooltip title="発見" placement="top-start" arrow>
            <h4>始まり：連想からの逸脱</h4>
          </Tooltip>
          <TextField
            value={formData.startStory}
            onChange={updateStartStory}
            multiline
            sx={getTextFieldStyle()}
          />
        </Box>
        <Box>
          <Tooltip title="発見" placement="top-start" arrow>
            <h4>順序：反論する</h4>
          </Tooltip>
          <TextField
            value={formData.orderStory}
            onChange={updateOrderStory}
            multiline
            sx={getTextFieldStyle()}
          />
        </Box>
        <Box>
          <Tooltip title="発見" placement="top-start" arrow>
            <h4>終わり：結論付ける</h4>
          </Tooltip>
          <FormControl sx={{ width: '300px' }}>
            <InputLabel id="demo-simple-select-label">解決方法</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.solution}
              onChange={updateSolution}
              label="選択してください"
              // onChange={handleChange}
            >
              <MenuItem value={'選択してください'}>選択してください</MenuItem>
              <MenuItem value={'感情的な解決'}>感情的な解決</MenuItem>
              <MenuItem value={'乗り越えと共感原則の解決'}>
                乗り越えと共感原則の解決
              </MenuItem>
              <MenuItem value={'論理的な解決'}>論理的な解決</MenuItem>
              <MenuItem value={'律法(習慣)的な解決'}>
                律法(習慣)的な解決
              </MenuItem>
              <MenuItem value={'諧謔的(ユーモア)な解決'}>
                諧謔的(ユーモア)な解決
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={formData.endStory}
            onChange={updateEndStory}
            multiline
            sx={getTextFieldStyle()}
          />
        </Box>
      </Box>
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

export default Memo;
