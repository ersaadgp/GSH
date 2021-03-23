import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import apis from '../../apis';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constant/action-types';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 375,
    height: '38vh',
  },
  cell: {
    padding: '1rem',
  },
  tableHead: {
    backgroundColor: '#7189BF',
  },
});

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const projectID = props.projectID;
  const dispatch = useDispatch();

  const retrospectives = useSelector((state) =>
    Object.values(state.retrospective)
  );

  const sprints = useSelector((state) => Object.values(state.sprint));

  const fetchSprint = (projectID) => {
    return async (dispatch) => {
      await apis
        .get(`/sprint/all/${projectID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_SPRINTS,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const fetchRetrospective = (projectID) => {
    return async (dispatch) => {
      await apis
        .get(`/sprint-retrospective/project/${projectID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_RETROSPECTIVE,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchSprint(projectID));
    dispatch(fetchRetrospective(projectID));
  }, [projectID]);

  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const startDate = new Date(row.startDate);
    const endDate = new Date(row.endDate);
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
    const sprintEndDate = `${
      month[endDate.getMonth()]
    } ${endDate.getDate()}, ${endDate.getFullYear()}`;

    const sprintStartDate = `${
      month[startDate.getMonth()]
    } ${startDate.getDate()}, ${startDate.getFullYear()}`;

    const renderRetrospective = (retro, index, sprintID) => {
      if (retro.sprintID === sprintID) {
        return (
          <TableRow key={retro.userID} indexarr={index}>
            <TableCell component="th" scope="row">
              {retro.userName}
            </TableCell>
            <TableCell component="th" scope="row">
              {retro.message}
            </TableCell>
            <TableCell>{retro.category}</TableCell>
          </TableRow>
        );
      }
    };

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.sprintID}
          </TableCell>
          <TableCell align="left">{row.sprintNumber}</TableCell>
          <TableCell align="left">{sprintStartDate}</TableCell>
          <TableCell align="left">{sprintEndDate}</TableCell>
          <TableCell align="left">{row.sprintGoal}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Retrospective
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Communicator</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {retrospectives.map((retro, index) => {
                      const sprintID = row.sprintID;
                      return renderRetrospective(retro, index, sprintID);
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: '#7189BF' }}>
            <TableCell />
            <TableCell>Sprint ID</TableCell>
            <TableCell align="left">No.</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">End Date</TableCell>
            <TableCell align="left">Sprint Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sprints.map((sprint) => (
            <Row key={sprint.sprintID} row={sprint} projectID={projectID} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
