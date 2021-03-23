import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../Navigation/NavbarAdmin';
import HistoryProject from '../../ProjectHistory/projectHistory';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  fullHeight: {
    height: '80%',
  },
});

export default function History() {
  const classes = useStyles();
  const users = useSelector((state) => state.auth);

  return (
    <>
      <Navbar></Navbar>
      <Container width="75%" className={classes.fullHeight}>
        <HistoryProject usertype={users.userType} userid={users.userID} />
      </Container>
    </>
  );
}
