import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    height: '48rem',
    width: '25rem',
    padding: '2rem',
    borderRadius: '2rem',
  },
  Input: {
    margin: '0.75rem',
    width: '15rem',
  },
  Button: {
    margin: '2rem 1rem',
    width: '6rem',

    color: 'white',
  },
  Button2: {
    borderRadius: '2rem',
    width: '25rem',
    height: '8vh',
    backgroundColor: '#72D6C9',
    color: 'white',
  },
}));

export default function SignupForm(props) {
  const dispatch = useDispatch('');
  const classes = useStyles();

  const projectID = props.projectID;

  const projectDetail = useSelector((state) => Object.values(state.history));

  const projectOwner = useSelector((state) => Object.values(state.projectTeam));

  const fetchProjectDetail = (projectID) => {
    return async (dispatch) => {
      await apis
        .get(`/project/finished/detail/${projectID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECT_DETAIL,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  console.log('detail', projectDetail)

  const fetchProjectOwner = (projectID) => {
    return async (dispatch) => {
      await apis
        .get(`project/product-owner-and-scrum-master/${projectID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECT_OWNER,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProjectDetail(projectID));
    dispatch(fetchProjectOwner(projectID));
  }, [projectID]);

  const convertToReadableDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  if (projectDetail.length === 0) return <div>loading...</div>;
  return (
    <>
      <Paper className={classes.Paper} elevation={3}>
        <h2>Project Information</h2>
        <hr></hr>
        <TextField
          className={classes.Input}
          label="Project Name"
          value={projectDetail[0].projectName}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Product Owner"
          value={projectOwner[0].userName}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Scrum Master"
          value={projectOwner[1].userName}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Start Date"
          value={convertToReadableDate(projectDetail[0].projectStartDate)}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="End Date"
          value={convertToReadableDate(projectDetail[0].projectEndDate)}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Estimate End Date"
          value={convertToReadableDate(projectDetail[0].projectEstEndDate)}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Total Man Hours"
          value={`${projectDetail[0].totalManHour} Hours`}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Total Sprint"
          value={`${projectDetail[0].totalSprint} Sprint`}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          className={classes.Input}
          label="Total Task"
          value={`${projectDetail[0].totalTask} Task`}
          InputLabelProps={{ shrink: true }}
          disabled
        />
      </Paper>
    </>
  );
}
