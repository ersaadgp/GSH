import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import BadgeList from './badgeList';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    width: '50rem',
    padding: '3rem 8rem 3rem 8rem',

    borderRadius: '2rem',
  },
  Input: {
    marginTop: '2rem',
    width: '24rem',
  },
  Button: {
    margin: '2rem 1rem 2rem 1rem',
    width: '8rem',
  },
  TextField: {
    marginTop: '2rem',
  },
}));

const CreateProject = (props) => {
  const classes = useStyles();
  const [projectName, setProjName] = React.useState('');
  const [productOwner, setPO] = React.useState('');
  const [scrumMaster, setSM] = React.useState('');
  const [tester, setTester] = React.useState('');
  const [devTeam, setDevTeam] = React.useState('');
  const [projectDueDate, setProjectDueDate] = React.useState('');

  const handleProjectNameChange = (event) => {
    setProjName(event.target.value);
  };

  const handleProjectDueDateChange = (event) => {
    setProjectDueDate(event.target.value);
  };

  const handleProductOwnerChange = (event) => {
    setPO(event.target.value);
  };

  const handleScrumMasterChange = (event) => {
    setSM(event.target.value);
  };

  const handleTesterChange = (event) => {
    setTester(event.target.value);
  };

  const handleDevTeamChange = (event) => {
    setDevTeam(event.target.value);
  };

  const handleInviteDevTeam = (e) => {
    e.preventDefault();
    props.onChangeEmail([...props.emails, devTeam]);
    setDevTeam('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      projectName,
      projectDueDate,
      productOwner,
      scrumMaster,
      tester,
      devTeam: props.emails,
    });
  };

  const handleDeleteEmail = (newEmails) => {
    props.onChangeEmail(newEmails);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper className={classes.Paper} elevation={3}>
        <h2>New Project</h2>
        <hr />
        <TextField
          className={classes.TextField}
          fullWidth
          placeholder="Project Name"
          InputLabelProps={{ shrink: true }}
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <TextField
          label="Project Due Date"
          type="date"
          className={classes.TextField}
          fullWidth
          placeholder=""
          InputLabelProps={{ shrink: true }}
          value={projectDueDate}
          onChange={handleProjectDueDateChange}
        />
        <TextField
          className={classes.TextField}
          fullWidth
          placeholder="Project Owner"
          InputLabelProps={{ shrink: true }}
          value={productOwner}
          onChange={handleProductOwnerChange}
        />
        <TextField
          className={classes.TextField}
          fullWidth
          placeholder="Scrum Master"
          InputLabelProps={{ shrink: true }}
          value={scrumMaster}
          onChange={handleScrumMasterChange}
        />
        <TextField
          className={classes.TextField}
          fullWidth
          placeholder="Tester"
          InputLabelProps={{ shrink: true }}
          value={tester}
          onChange={handleTesterChange}
        />
        <TextField
          className={classes.Input}
          placeholder="Dev. Team"
          InputLabelProps={{ shrink: true }}
          value={devTeam}
          onChange={handleDevTeamChange}
        />
        <Button
          className={classes.Button}
          variant="contained"
          color="primary"
          onClick={handleInviteDevTeam}
        >
          Invite
        </Button>
        <BadgeList emails={props.emails} onDeleteEmail={handleDeleteEmail} />
        <hr />
        <Button
          variant="contained"
          style={{ width: '180px', margin: '1rem' }}
          color="primary"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Paper>
    </Grid>
  );
};

export default CreateProject;
