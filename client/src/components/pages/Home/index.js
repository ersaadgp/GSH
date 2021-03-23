import React from 'react';
import { Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import NavbarAdmin from '../../Navigation/NavbarAdmin';
import NavbarDev from '../../Navigation/NavbarDevTeam';
import ProjectList from '../../DataList/project';

import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  fullHeight: {
    height: '80%',
  },
});

export default function Index() {
  const classes = useStyles();
  const users = useSelector((state) => state.auth);

  const renderNavbar = () => {
    return users.userType === 'admin' ? <NavbarAdmin /> : <NavbarDev />;
  };

  return (
    <>
      {renderNavbar()}
      <Container width="75%" className={classes.fullHeight}>
        <ProjectList usertype={users.userType} userid={users.userID} />
      </Container>
    </>
  );
}
