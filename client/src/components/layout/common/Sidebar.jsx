import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React, { useEffect, useState } from 'react';
import assets from '../../../assets/index';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import memoApi from '../../../api/memoApi';
import { setMemo } from '../../../redux/features/memoSlice';
import { setFavorite } from '../../../redux/features/favoriteSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favoriteMemo.value);
  // console.log(favoriteMemos);
  // const favorite = memos.filter((e) => e.favorite === true);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
        const resFavorite = await memoApi.getFavoriteAll();
        dispatch(setFavorite(resFavorite));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
    // お気に入りを表示する
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [[navigate, dispatch]]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    useSelect: 'none',
    margin: `0 0 ${grid} 0`,
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle,
  });
  const favoriteReloader = async (list, startIndex, endIndex) => {
    let newMemos = [...list];
    let newPosition = []; //取得したメモの位置を一時保存
    // console.log(newMemos);
    for (let prop in newMemos) {
      newPosition.push(newMemos[prop].favoritePosition);
    }
    //endIndex とstartIndex の処理が逆になっているが
    //position の並び順が降順になっているので移動先のデータを抜いて移動元に追加する必要がある
    const removedPosition = newPosition.splice(endIndex, 1);
    newPosition.splice(startIndex, 0, removedPosition[0]);
    //position の入れ替え
    const updateMemo = [];
    for (let prop in newMemos) {
      updateMemo[prop] = {
        ...newMemos[prop],
        favoritePosition: newPosition[prop],
      };
      newMemos[prop] = updateMemo[prop];
    }
    // console.log(newMemos);
    // position を入れ替えたメモをNode.js に渡してデータベースを更新する
    try {
      const res = await memoApi.updateFavoritePosition(newMemos);
      //並び変えたメモを受け取ってdispatch する
      dispatch(setFavorite(res));
    } catch (err) {
      alert(err);
    }
  };
  const reloader = async (list, startIndex, endIndex) => {
    // list=memos は参照専用
    //memoApi を使って順序を入れ替える必要がある
    //memoApi に入れ替えたリストを保存する必要がある
    //dispatchする
    let newMemos = [...list];
    let newPosition = []; //取得したメモの位置を一時保存
    for (let prop in newMemos) {
      newPosition.push(newMemos[prop].position);
    }
    //endIndex とstartIndex の処理が逆になっているが
    //position の並び順が降順になっているので移動先のデータを抜いて移動元に追加する必要がある
    const removedPosition = newPosition.splice(endIndex, 1);
    newPosition.splice(startIndex, 0, removedPosition[0]);
    //position の入れ替え
    const updateMemo = [];
    for (let prop in newMemos) {
      updateMemo[prop] = { ...newMemos[prop], position: newPosition[prop] };
      newMemos[prop] = updateMemo[prop];
    }
    //position を入れ替えたメモをNode.js に渡してデータベースを更新する
    try {
      const res = await memoApi.updatePosition(newMemos);
      //並び変えたメモを受け取ってdispatch する
      dispatch(setMemo(res));
    } catch (err) {
      alert(err);
    }
  };

  const onFavoriteDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const list = favoriteReloader(
      favoriteMemos,
      result.source.index,
      result.destination.index
    );
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const list = reloader(memos, result.source.index, result.destination.index);
  };
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        {/* {favoriteMemos.map((item, index) => (
          <ListItemButton
            sx={{ pl: '20px' }}
            component={Link}
            to={`/memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))} */}

        <DragDropContext onDragEnd={onFavoriteDragEnd}>
          <Droppable droppableId="favoriteDroppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {favoriteMemos.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ListItemButton
                          sx={{ pl: '20px' }}
                          component={Link}
                          to={`/memo/${item._id}`}
                          key={item._id}
                          selected={index === activeIndex}
                        >
                          <Typography>
                            {item.icon} {item.title}
                          </Typography>
                        </ListItemButton>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {memos.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ListItemButton
                          sx={{ pl: '20px' }}
                          component={Link}
                          to={`/memo/${item._id}`}
                          key={item._id}
                          selected={index === activeIndex}
                        >
                          <Typography>
                            {item.icon} {item.title}
                          </Typography>
                        </ListItemButton>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
