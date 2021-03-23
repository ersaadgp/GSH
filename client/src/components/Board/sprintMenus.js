import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Link } from 'react-router-dom';

import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ITEM_HEIGHT = 48;

export default function SprintMenu(props) {
  const sprint = props.sprint[0];
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const endSprint = (sprintID) => {
    const formData = sprint.sprintID;
    return async (dispatch) => {
      await apis
        .patch('/sprint/end', formData)
        .then((response) => {
          dispatch({
            type: actionTypes.PATCH_SPRINT_END,
            payload: response.data,
          });
          history.push(
            `/retrospective/${props.projectId}/${sprintID.sprintID}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const createMenu = (link, display) => {
    return { link, display };
  };

  const options = [
    createMenu(`/sprint-planning/${props.projectId}`, 'Edit Sprint'),
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEndSprint = (e) => {
    e.preventDefault();
    dispatch(endSprint({ sprintID: sprint.sprintID }));
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.link} onClick={handleClose}>
            <Link to={option.link} style={{ color: 'black' }}>
              {option.display}
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleEndSprint}>End Sprint</MenuItem>
      </Menu>
    </>
  );
}
