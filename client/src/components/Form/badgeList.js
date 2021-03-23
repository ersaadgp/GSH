import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontWeight: '400 !important',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  dev: {
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'left',
  },
  dBlock: {
    display: 'block',
  },
  noDevTeam: {
    fontWeight: '400 !important',
    marginLeft: '3px',
  },
}));

export default function Chips({ emails = [], onDeleteEmail }) {
  const classes = useStyles();

  const handleDelete = (emailToDelete) => () => {
    const newEmail = emails.filter((email) => email !== emailToDelete);
    onDeleteEmail(newEmail);
  };

  const renderEmailList = () => {
    if (!emails.length)
      return <div className={classes.noDevTeam}> No Member</div>;
    return (
      <>
        <br />
        <div className={(classes.root, classes.dBlock)}>
          {emails.map((email, index) => {
            return (
              <Chip
                key={index}
                label={email}
                onDelete={handleDelete(email)}
                color="primary"
              />
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <div className={classes.dev}>Dev Team : </div>
      {renderEmailList()}
    </>
  );
}
