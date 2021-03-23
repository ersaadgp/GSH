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
import CreateUserStory from './createUserStory';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import ErrorIcon from '@material-ui/icons/Error';
import Popover from '../Popover';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 275,
    height: '35vh',
  },
  cell: {
    padding: '0.5rem 0 0 1rem',
  },
  modal: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1300,
    opacity: 1,
  },
  overlay: {
    backgroundColor: '#fff',
    opacity: 0,
  },
});

export default function BacklogList({ sprintId, projectId }) {
  const classes = useStyles();

  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const productBacklog = useSelector((state) =>
    Object.values(state.productBacklog)
  );

  const handleOpenError = () => {
    setOpenError(true);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const users = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchProductBacklog = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/product-backlog-item/project/${projectId}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PBITEM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProductBacklog(projectId));
  }, [users.userID]);

  const [open, setOpen] = React.useState(false);

  const [id, setId] = useState('');

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createUserStory = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/user-story', formData)
        .then((res) => {
          dispatch({
            type: actionTypes.ADD_USER_STORY,
            payload: res.data,
          });
        })
        .catch((err) => {
          setErrorTitle(err.response.data.title);
          setMessage(err.response.data.message);
          handleOpenError();
        });
    };
  };

  const handleSubmit = (formData) => {
    dispatch(createUserStory(formData));
  };

  if (!Object.keys(productBacklog).length)
    return <div>Nothing on Product Backlog</div>;
  else
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {productBacklog.map((project) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={project.PBItemID}
                  >
                    <TableCell className={classes.cell}>
                      {project.description}
                    </TableCell>
                    <TableCell
                      style={{
                        padding: '0.5rem 1.5rem 0.5rem 0',
                        width: '3rem',
                      }}
                    >
                      <Button
                        onClick={() => handleOpen(project.PBItemID)}
                        className={classes.action}
                        type="button"
                      >
                        Choose
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <Modal
                className={classes.modal}
                open={open}
                modalid={id}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <CreateUserStory
                    sprintId={sprintId}
                    pbid={id}
                    onSubmit={handleSubmit}
                  ></CreateUserStory>
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
