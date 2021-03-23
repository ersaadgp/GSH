import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import Task from './modal';
import AddTask from './createTask';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import { useSelector, useDispatch } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import Popover from '../Popover';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 255,
    height: '27vh',
  },
  action: {
    color: 'black',
  },
  cell: {
    padding: '0.5rem 1.5rem',
  },
  modal: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1300,
    opacity: 1,
  },
  paper: {},
  overlay: {
    backgroundColor: '#fff',
    opacity: 0,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const userStory = useSelector((state) => Object.values(state.userStory));

  const SprintID = props.currentSprint;
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [id, setId] = useState('');

  const handleOpenError = () => {
    setOpenError(true);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const fetchUserStory = (sprintID) => {
    return async (dispatch) => {
      await apis
        .get(`/user-story/sprint/${sprintID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_USER_STORY,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const createTask = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/task', formData)
        .then((res) => {
          dispatch({
            type: actionTypes.ADD_TASK,
            payload: res.data,
          });
          handleCloseAdd();
        })
        .catch((err) => {
          setErrorTitle(err.response.data.title);
          setMessage(err.response.data.message);
          handleOpenError();
        });
    };
  };

  useEffect(() => {
    dispatch(fetchUserStory(SprintID));
  }, [SprintID]);

  const handleOpenAdd = (id) => {
    setId(id);
    setOpenAdd(true);
  };

  const handleOpenView = (id) => {
    setId(id);
    setOpenView(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleSubmit = (formData) => {
    dispatch(createTask(formData));
  };
  if (!Object.keys(userStory).length) return <div>Nothing on User Story</div>;
  else
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {userStory.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.userStoryID}
                  >
                    <TableCell
                      key={row.userStoryID}
                      align="left"
                      className={classes.cell}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell align="right" className={classes.cell}>
                      <Button
                        onClick={() => handleOpenAdd(row.userStoryID)}
                        className={classes.action}
                        type="button"
                      >
                        Add
                      </Button>

                      <Button
                        onClick={() => handleOpenView(row.userStoryID)}
                        className={classes.action}
                        type="button"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <Modal
                className={classes.modal}
                open={openView}
                modalId={id}
                onClose={handleCloseView}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openView}>
                  <Task taskid={id} sprintid={SprintID}></Task>
                </Fade>
              </Modal>
              <Modal
                className={classes.modal}
                open={openAdd}
                onClose={handleCloseAdd}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openAdd}>
                  <AddTask
                    usid={id}
                    sprintid={SprintID}
                    onSubmit={handleSubmit}
                    projectId={props.projectId}
                  ></AddTask>
                </Fade>
              </Modal>
            </TableBody>
          </Table>
          <Popover
            message={message}
            onClose={handleCloseError}
            visibility={openError}
            title={errorTitle}
            icon={<ErrorIcon style={{ fontSize: 40 }} />}
          />
        </TableContainer>
      </Paper>
    );
}
