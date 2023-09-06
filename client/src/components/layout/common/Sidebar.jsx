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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);
  // console.log(memos);
  const favorite = memos.filter((e) => e.favorite === true);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  // テスト用
  const items = [
    {
      id: 'item-0',
      content: 'item 0',
    },
    {
      id: 'item-1',
      content: 'item 1',
    },
    {
      id: 'item-2',
      content: 'item 2',
    },
    {
      id: 'item-3',
      content: 'item 3',
    },
    {
      id: 'item-4',
      content: 'item 4',
    },
  ];
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

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
    width: '250px',
    padding: grid,
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    useSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid} 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  });
  const reloader = (list, startIndex, endIndex) => {
    // list=memos は参照専用
    //memoApi を使って順序を入れ替える必要がある
    //memoApi に入れ替えたリストを保存する必要がある
    //dispatchする
    let newMemos = { ...list };
    console.log(startIndex, endIndex);
    console.log(newMemos);
    let newPosition = [];
    for (const property in newMemos) {
      newPosition.push(newMemos[property].position);
    }
    // console.log(newPosition);
    const removed = newPosition.splice(startIndex, 1);
    newPosition.splice(endIndex, 0, removed[0]);
    // console.log(newPosition);
    for (const property in newMemos) {
      // newMemos[property] = { position: newPosition[property] };
      newMemos[property].position = newPosition[property];
    }
    console.log(newMemos);

    // const newMemos = [res, ...memos];
    // dispatch(setMemo(newMemos));
    // let newPosition = newMemos.map((memo) => {
    //   return memo;
    // });

    // console.log(newPosition);
    // newMemos.map((value, index) => {
    //   console.log(value, index);
    // });
    // const removed = newMemos.splice(startIndex, 1);
    // newMemos.splice(endIndex, 0, removed[0]);
    // dispatch(setMemo(newMemos));

    // console.log(removed);
    // return list;
  };
  const [dndState, setDndState] = useState(items);
  // ドラッグ後に位置が変わっていた場合、順序入れ替えをする
  const onDragEnd = (result) => {
    // console.log(result);
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const list = reloader(memos, result.source.index, result.destination.index);
    // setDndState(list);
    // console.log(dndState);
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
        {favorite.map((item, index) => (
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
        ))}
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
        {/* {memos.map((item, index) => (
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
        <ListItemButton>
          <Box>
            <Typography variant="body2" fontWeight="700">
              DND
            </Typography>
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
                        {item.icon} {item.title}
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
